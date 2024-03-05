#!/bin/sh

# Preparing
echo "Install packages"

yarn install

echo "Rebuild application..."
yarn fe:build

# Start project
echo "Starting server...!"
yarn fe:start

