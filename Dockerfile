# Use the official Node.js image as the base image.
FROM node:24-alpine

# Set the working directory
WORKDIR /app

# Copy the project's package.json and package-lock.json
COPY package*.json ./

# Install Project Dependencies
RUN npm install

# Copy the source code of the project
COPY . .

# Build an Eleventy Project
RUN npx eleventy

# Expose server port
EXPOSE 8080

# Start Eleventy
CMD ["npx", "eleventy", "--serve"]
