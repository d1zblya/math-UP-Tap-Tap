#!/bin/sh
export PYTHONPATH="/app"

echo "Let the DB start"
python ./src/backend_pre_start.py

echo "Applying database migrations..."
alembic upgrade head

echo "Starting the application..."
python ./src/main.py
