# ---------------------------------------------------
# Stage 1: Build Application
# ---------------------------------------------------
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependency files first to leverage layer caching
COPY package*.json ./

# Install dependencies cleanly and clear cache to free space
RUN npm install && npm cache clean --force

# Copy source code and build
COPY . .
RUN npm run build

# ---------------------------------------------------
# Stage 2: Ultra-lightweight Production Serve
# ---------------------------------------------------
FROM nginx:alpine-slim

# Remove default Nginx static assets to save space
RUN rm -rf /usr/share/nginx/html/*

# Copy only the compiled static build output (use /app/dist if using Vite)
COPY --from=build /app/build /usr/share/nginx/html

# SPA Routing Fallback (prevents 404 on page refresh)
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]