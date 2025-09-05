# Multi-stage Dockerfile for outline-mcp-server
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# List contents (to make sure all files are copied)
RUN ls -la

# Manually run tsc and show output
RUN npx tsc

# Check if output files were created
RUN if [ -f "build/index.js" ]; then echo "✅ index.js exists"; else echo "❌ index.js missing"; fi
RUN if [ -f "build/stdio.js" ]; then echo "✅ stdio.js exists"; else echo "❌ stdio.js missing"; fi

# Try to make binaries executable
RUN if [ -f "build/index.js" ]; then chmod +x build/index.js; else echo "⚠️ Skipping chmod on index.js"; fi
RUN if [ -f "build/stdio.js" ]; then chmod +x build/stdio.js; else echo "⚠️ Skipping chmod on stdio.js"; fi

# Now run the build script
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
