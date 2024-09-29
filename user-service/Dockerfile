# Use the official Node.js image, alpine variant for a smaller image
FROM node:alpine

# Install PNPM globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install the dependencies using pnpm
RUN pnpm install --prod

# Copy the rest of the application code to the working directory
COPY . .

# If you have a build step (e.g., TypeScript), run it here
# Uncomment the next line if you have a build script
# RUN pnpm build

# Expose the port your service runs on (e.g., 3000)
EXPOSE 3000

# Command to start your auth service
CMD ["pnpm", "start"]
