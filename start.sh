#!/bin/bash

echo "Starting PiCollector..."

# Update dependencies before starting
./setup.sh

# Start Flask API
cd api
source venv/bin/activate
nohup python3 app.py &
cd ..

# Start React App
cd frontend
npm start &
cd ..

echo "PiCollector is now running!"