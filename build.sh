#/bin/bash

# Git Checkout & Git pull
git checkout master
git pull

# Install dependencies
npm install

# Build the app
npm run build

# Export the app
npm run export