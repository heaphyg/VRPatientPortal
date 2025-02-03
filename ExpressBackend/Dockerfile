# Use official Node.js LTS image as the base image
FROM node:20-alpine

# Set working directory in the container
WORKDIR /app

# Install nodemon globally
RUN npm install -g nodemon

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm ci
COPY . /app

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application in development with nodemon
CMD ["nodemon", "--legacy-watch", "server.js"]