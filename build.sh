#!/bin/bash

npm audit
npm audit fix --force
# Install npm dependencies
echo "Installing dependencies..."
npm install

# Start the application
echo "Starting the application..."
node start
