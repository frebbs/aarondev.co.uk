# Use an official Node runtime as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Set environment variable for PORT
ENV PORT "${params.ENVIRONMENT == 'root': '3000' : params.ENVIRONMENT == 'dev1': '8080' : params.ENVIRONMENT == 'dev2': '8081' : params.ENVIRONMENT == 'prd1': '8082' : 'unknown'}"

# Install project dependencies
RUN npm install

# Copy the rest of your project files into the Docker container
COPY . .

# Make port 8080 available to the world outside this container
EXPOSE $PORT

# Run the application using nodemon for development
CMD ["npm", "run", "start:dev"]
