FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

EXPOSE 3000

# Run as non-root user
USER node

# Start through dumb-init
CMD ["dumb-init", "node", "server.js"]
