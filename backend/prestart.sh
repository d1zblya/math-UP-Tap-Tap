#!/bin/sh
export PYTHONPATH="/app"

echo "Let the DB start"
python ./src/backend_pre_start.py

echo "Applying database migrations..."
alembic upgrade head

echo "Starting the application..."
exec uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
