#!/bin/sh

# Preparing
echo "Install packages"
npm i -g yarn

yarn install

echo "Rebuild application..."
yarn fe:build

# Start project
echo "Starting server...!"
yarn fe:start
