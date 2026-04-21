# --- STAGE 1: Builder ---
FROM node:18-alpine as builder

# 1. System-Abhängigkeiten
RUN apk add --no-cache vips-dev fftw-dev build-base python3

WORKDIR /app

# 2. NPM Abhängigkeiten (Separat gecacht)
# Dateien in /app kopieren, wo das install ausgeführt wird
COPY converter/package.json converter/package-lock.json* ./
RUN npm install --production

# 3. Quellcode und Assets
COPY public ./public
COPY converter/convert.js converter/minify-css.js ./

# 4. Rechenintensive Schritte
RUN node convert.js && node minify-css.js


# --- STAGE 2: Runtime ---
FROM nginxinc/nginx-unprivileged:alpine

# Eigene Config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Nur die finalen Artefakte kopieren
COPY --from=builder /app/public /usr/share/nginx/html

EXPOSE 8080