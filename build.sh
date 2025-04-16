#!/bin/bash

npm audit
npm audit fix --force
# Install npm dependencies
echo "Installing dependencies..."
npm install express axios

# Start the application
echo "Starting the application..."
node src/npm/server.js
