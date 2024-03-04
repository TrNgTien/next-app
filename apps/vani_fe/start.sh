#!/bin/sh

# Preparing
echo "Rebuild application..."
yarn fe:build

# Start project
echo "Starting server...!"
yarn fe:start
