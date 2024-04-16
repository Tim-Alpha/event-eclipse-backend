# Use an official Node.js image as a base
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app


# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

RUN chown -R node:node /usr/src/app
USER node

# Expose the port your app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]