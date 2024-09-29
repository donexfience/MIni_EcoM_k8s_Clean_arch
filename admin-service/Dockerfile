# Use an official Node.js image based on Alpine for a smaller image size
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Build the application (only if you have a build step, e.g., for TypeScript or Webpack)
RUN npm run build

# Expose the application port (3005 in this case)
EXPOSE 3005

# Command to run your application
CMD ["npm", "start"]
