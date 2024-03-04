#!/bin/sh

# Preparing
echo "Rebuild application..."
yarn build

# Start project
echo "Starting server...!"
yarn start
