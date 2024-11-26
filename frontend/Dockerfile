# Use the official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app/
RUN npm install

# Copy the application code
COPY . /app/

# Expose the port React runs on
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
