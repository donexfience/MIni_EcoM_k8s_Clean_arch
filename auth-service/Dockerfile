# Use the official Node.js image as a base, alpine variant for a smaller image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install the dependencies using yarn
RUN yarn install --production

# Copy the rest of the application code to the working directory
COPY . .

# If you have a build step (e.g., TypeScript), run it here
# Uncomment the next line if you have a build script
# RUN yarn build

# Expose the port your service runs on (e.g., 3000)
EXPOSE 3000

# Command to start your auth service
CMD ["yarn", "start"]
