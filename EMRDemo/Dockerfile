# Stage 1: Build the Vite app
FROM node:18-alpine AS builder
WORKDIR /app

COPY . .
RUN npm install && chmod +x node_modules/.bin/vite && npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf