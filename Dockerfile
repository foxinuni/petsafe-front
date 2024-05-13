# Use the official Node 16 image as the base image
FROM node:16.20.2-alpine3.18

# COMMIT SHA args
ARG COMMIT_SHA
ENV REACT_APP_COMMIT_SHA=$COMMIT_SHA

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire project to the working directory
COPY . .

# Expose port 3000 for the React app
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]