# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy deps
COPY package*.json ./

# Install WITHOUT triggering prepare hooks
RUN npm install --ignore-scripts

# Copy source
COPY . .

# Manually run build (explicitly)
RUN npm run build


###################
# Production Image
###################

FROM node:20-alpine

WORKDIR /app

# Copy binary
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./

# Clean install without dev deps
RUN npm install --production --ignore-scripts

EXPOSE 6060

CMD [ "node", "build/index.js" ]
