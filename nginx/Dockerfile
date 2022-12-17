FROM nginx:alpine

COPY --from=toiki-build /app/build/web /var/www/toiki
COPY . /etc/nginx/
