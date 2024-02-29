
FROM python:3.10-slim
WORKDIR /app/worker
COPY requirements.txt .
RUN pip install --no-cache-dir -q -r requirements.txt
COPY . .
EXPOSE 5001
CMD ["python", "app.py"]
