#!/bin/bash

echo "Starting setup for PiCollector..."

echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo "Installing required dependencies..."
sudo apt install -y python3 python3-pip python3-venv git nodejs npm

echo "Setting up Python environment for Flask API..."
cd api
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt
deactivate
cd ..

echo "Installing Node.js dependencies for React frontend..."
cd frontend
npm install
cd ..

echo "Setup completed successfully!"