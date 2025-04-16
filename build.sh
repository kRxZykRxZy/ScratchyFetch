#!/bin/bash

# Run npm audit
npm audit
npm audit fix --force

# Install npm dependencies
echo "Installing dependencies..."
npm install express axios

# Start the application using nohup
echo "Starting the application..."
nohup node src/npm/server.js &
