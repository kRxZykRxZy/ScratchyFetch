#!/bin/bash

# Run npm audit
npm audit
npm audit fix --force

# Install npm dependencies
echo "Installing dependencies..."
npm install

# Start the application using nohup
echo "Starting the application..."
npm start
