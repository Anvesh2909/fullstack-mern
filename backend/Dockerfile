# Use the official Node.js image with Alpine
FROM node:20-alpine3.18

# Create a non-root user
RUN addgroup -S app && adduser -S -G app app

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json first (for efficient caching)
COPY package*.json ./

# Switch to root to change ownership
USER root
RUN chown -R app:app /app

# Switch to the app user
USER app

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application files
COPY --chown=app:app . .

# Expose port 9000
EXPOSE 9000

# Start the server
CMD node server.js