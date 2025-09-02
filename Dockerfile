# Minimal Multi-stage Dockerfile for outline-mcp-server
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev --ignore-scripts
COPY .env.example .
EXPOSE 6060
CMD ["node", "build/index.js"]
