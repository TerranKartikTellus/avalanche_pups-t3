import time
from flask import Flask, jsonify, request
from flask_cors import CORS
import redis
import psycopg2
import joblib

app = Flask(__name__)
CORS(app)

# Connect to Redis
redis_client = redis.StrictRedis(host='redis', port=6379, decode_responses=True)


def create_postgres_database():
    # Connect to default 'postgres' database
    conn = psycopg2.connect(
        user="postgres",
        password="postgres_password",
        host="postgres",
        port="5432"
    )
    conn.autocommit = True
    cursor = conn.cursor()

    try:
        # Check if 'predictions' database exists
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = 'predictions'")
        if cursor.fetchone():
            print("Database 'predictions' already exists")
        else:
            # Create 'predictions' database
            cursor.execute("CREATE DATABASE predictions")

            print("Database 'predictions' created successfully")
        
    except Exception as e:
        print("Error creating database:", e)

    conn.close()
def create_predictions_table():
    try:
        # Connect to PostgreSQL
        conn = psycopg2.connect(
            user="postgres",
            password="postgres_password",
            host="postgres",
            port="5432",
            database="predictions"
        )
        conn.autocommit = True
        cursor = conn.cursor()

        # Check if 'predictions' table exists
        cursor.execute("SELECT to_regclass('predictions')")
        table_exists = cursor.fetchone()[0]

        if table_exists:
            print("Table 'predictions' already exists")
        else:
            # Create 'predictions' table
            cursor.execute("""
                CREATE TABLE predictions (
                    id SERIAL PRIMARY KEY,
                    boot INT,
                    harness INT,
                    message TEXT,
                    flag INT
                )
            """)
            print("Table 'predictions' created successfully")

            if conn:
                conn.close()
    except Exception as e:
        print("Error creating table:", e)

# Call the function to create the 'predictions' table
create_predictions_table()
# Create the 'predictions' database
create_postgres_database()

# Connect to PostgreSQL
postgres_conn = psycopg2.connect(
    user="postgres",
    password="postgres_password",
    host="postgres",
    port="5432",
    database="predictions"
)
postgres_cursor = postgres_conn.cursor()

# Connect to PostgreSQL
postgres_conn = psycopg2.connect(
    user="postgres",
    password="postgres_password",
    host="postgres",
    port="5432",
    database="predictions"
)
postgres_cursor = postgres_conn.cursor()



# Load the machine learning model
model = joblib.load("./avalanche_dog_boot_model.pkl")
# df = pd.read_pickle("file.pkl")

def load_model_and_predict(harness_size):
    print("We've loaded a model with the following parameters:")
    print(model.params)
    inputs = {"harness_size": [harness_size]}
    predicted_boot_size = model.predict(inputs)[0]
    return int(round(predicted_boot_size))

@app.route("/predict", methods=['GET'])
def predict():
    boot = int(request.args.get('b'))
    harness = int(request.args.get('h'))
    app.logger.info(f'Input: {boot} | {harness}')

    # Check if data is cached in Redis
    cache_key = f"{boot}_{harness}"
    if redis_client.exists(cache_key):
        redis_data = redis_client.hgetall(cache_key)
        message = redis_data.get('message', '')
        flag = int(redis_data.get('flag', 0))
        # If message and flag are retrieved from Redis, return them directly
        return jsonify({'flag': flag, 'message': message})
    else:
        # Calculate and store prediction in PostgreSQL and Redis
        time.sleep(10)
        estimated_boot_size = load_model_and_predict(harness)
        if boot == estimated_boot_size:
            message = f"Great choice! We think these boots and harness pair will fit your avalanche dog well."
            flag = 0
        elif boot < estimated_boot_size:
            message = f"The boots and harness pair you have selected might be TOO SMALL for a dog as "\
                      f"big as yours. We recommend a doggy boots size of {estimated_boot_size}."
            flag = -1
        else:
            message = f"The boots and harness pair you have selected might be TOO BIG for a dog as "\
                      f"small as yours. We recommend a doggy boots size of {estimated_boot_size}."
            flag = 1
        
        # Store response in PostgreSQL
        postgres_cursor.execute("INSERT INTO predictions (boot, harness, message, flag) VALUES (%s, %s, %s, %s)", (boot, harness, message, flag))
        postgres_conn.commit()

        # Store response in Redis cache
        redis_client.hmset(cache_key, {'flag': flag, 'message': message})
        return jsonify({'flag': flag, 'message': message})
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
