# ==============================================================================
# Dogfood 2026: Fast & Resilient Multi-Stage Dockerfile
# ==============================================================================

# --- Stage 1: Build Frontend Assets ---
FROM node:20-alpine AS client-builder
WORKDIR /app/client

# Copy package definition and install dependencies
COPY client/package.json ./
RUN npm install --no-audit --no-fund --loglevel warn

# Copy source and build
COPY client/ ./
RUN npm run build

# --- Stage 2: Production Server Runtime ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

# Install production server dependencies
COPY package.json ./
RUN npm install --only=production --no-audit --no-fund --loglevel warn

# Copy server code
COPY server/ ./server/

# Copy compiled frontend from stage 1
COPY --from=client-builder /app/client/dist ./client/dist

# Ensure persistent data directory exists with correct permissions
RUN mkdir -p /app/data && chown -R node:node /app

# Switch to non-root user
USER node

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["node", "server/index.js"]
