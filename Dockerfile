# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Command to start the app
CMD ["node", "index.js"]
