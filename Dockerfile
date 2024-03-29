# Use an official Node runtime as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Set environment variable for PORT based on the build argument
ENV PORT=${PORT:-8080}

# Install project dependencies
RUN npm install

# Copy the rest of your project files into the Docker container
COPY . .

RUN mkdir -p /usr/src/app/logs

RUN npm run build:js
RUN npm run build:sass

# Make port  available to the world outside this container
EXPOSE $PORT

# Run the application using nodemon for development
CMD ["npm", "run", "start:dev"]
