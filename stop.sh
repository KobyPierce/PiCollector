#!/bin/bash

echo "Stopping PiCollector..."

# Kill Flask API
pkill -f "python3 app.py"

# Kill React App
pkill -f "npm start"

echo "PiCollector has been stopped!"