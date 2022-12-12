FROM nginx:alpine

COPY --from=toiki-build build/web /var/www/toiki
COPY . /etc/nginx/
