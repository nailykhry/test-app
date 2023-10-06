# Use an official Node.js runtime as the base image
FROM node:14

LABEL maintainer="nailykhairiya@gmail.com"

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3001 (or the port your Express app listens on)
EXPOSE 3001

# Define the command to start your Express application
CMD ["npx", "nodemon", "bin/app/server.js"]
