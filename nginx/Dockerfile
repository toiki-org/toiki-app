FROM nginx:alpine

COPY --from=ghcr.io/toiki-org/toiki-build:latest /app/build/web /var/www/toiki
COPY . /etc/nginx/
