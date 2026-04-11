FROM node:20-alpine

# Install dependencies for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Create app directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S puppeteer -u 1001

# Change ownership
RUN chown -R puppeteer:nodejs /app
USER puppeteer

# Expose port
EXPOSE 9222

# Start Puppeteer service
CMD ["node", "puppeteer-service.js"]