#!/bin/sh

echo "Install dependencies..."
apt update
npm install -g npm yarn
yarn install

# Preparing
echo "Rebuild application..."
yarn build

# Start project
echo "Starting server...!"
yarn start
