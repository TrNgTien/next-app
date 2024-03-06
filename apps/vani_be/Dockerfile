# Use the official Node.js image as the base
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

# Install project dependencies
RUN npm install -g yarn

RUN yarn install

yarn build

COPY ./dist .

COPY .env .env

EXPOSE 8080

# Start the Node.js application
CMD ["node", "application.js"]
