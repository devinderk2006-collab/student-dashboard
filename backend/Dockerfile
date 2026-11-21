FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN useradd --create-home appuser && chown -R appuser:appuser /app
USER appuser
EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD python -c "import socket; socket.create_connection(('localhost', 5000), 3)" || exit 1
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
