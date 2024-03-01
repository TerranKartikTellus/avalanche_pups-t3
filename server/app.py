from flask import Flask, jsonify, request
from flask_cors import CORS
import redis
import requests
app = Flask(__name__)
CORS(app)

# Connect to Redis
redis_client = redis.StrictRedis(host='redis', port=6379, decode_responses=True)

# Connect to PostgreSQL
# postgres_conn = psycopg2.connect(
#     user="your_username",
#     password="your_password",
#     host="postgres",  # <-- Use the service name defined in Docker Compose
#     port="5433",
#     database="your_database"
# )
# postgres_cursor = postgres_conn.cursor()

@app.route("/predict", methods=['GET'])
def predict():
    boot = int(request.args.get('b'))
    harness = int(request.args.get('h'))

    # Check if data is cached in Redis
    cache_key = f"{boot}_{harness}"
    if redis_client.exists(cache_key):
        return jsonify(redis_client.hgetall(cache_key))
    else:
        # If data not found in cache, query PostgreSQL or call worker
        # Placeholder for calling worker or querying PostgreSQL
        # Assuming worker is running on port 5001
        worker_response = requests.get(f"http://worker:5001/predict?b={boot}&h={harness}").json()
        # Store response in Redis cache
        redis_client.hmset(cache_key, worker_response)
        print('Got Data on Redis')
        return jsonify(worker_response)

@app.route("/", methods=['GET'])
def home():
    return jsonify('server')
    
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
