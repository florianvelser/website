# --- STAGE 1: Builder ---
FROM node:24-alpine as builder

# 1. System-Abhängigkeiten
RUN apk add --no-cache vips-dev fftw-dev build-base python3

WORKDIR /app

# 2. NPM Abhängigkeiten
COPY package.json package-lock.json* ./
RUN npm install

COPY converter/package.json converter/package-lock.json* ./converter/
RUN cd converter && npm install --production

# 3. Quellcode und Assets
COPY src ./src
COPY .eleventy.js ./
COPY converter/convert.js converter/minify-css.js ./converter/

# 4. Rechenintensive Schritte
RUN node converter/convert.js && node converter/minify-css.js

# 5. Statischen Build laufen lassen
RUN npm run build

# --- STAGE 2: Runtime ---
FROM nginxinc/nginx-unprivileged:alpine

# Eigene Config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Nur die finalen Artefakte kopieren
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080