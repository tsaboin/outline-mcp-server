# Multi-stage Dockerfile for outline-mcp-server
FROM node:20-alpine AS build

# Optional: Install bash for easier debugging
RUN apk add --no-cache bash

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Debug: Print directory structure
RUN ls -la

# Debug: Run tsc manually to see exact error
RUN npx tsc --noEmitOnError false

# Debug: Check if build/index.js exists
RUN if [ ! -f "build/index.js" ]; then echo "❌ build/index.js not found after tsc"; else echo "✅ build/index.js exists"; fi

# Run build script
RUN npm run build

#################
# Production Stage
#################
FROM node:20-alpine

WORKDIR /app

# Copy built output and package files
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev --ignore-scripts

EXPOSE 6060

CMD ["node", "build/index.js"]
