FROM nginx:alpine

COPY --from=ghcr.io/toiki-org/toiki-build:latest /app/dist /var/www/toiki
COPY . /etc/nginx/
