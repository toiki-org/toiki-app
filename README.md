# toiki

## Client
```
docker build --build-arg ARCH=linux/amd64 --build-arg VITE_API_URL=localhost:8000 client -t toiki-build
```
change the ARCH build arg according to your architecture.


## Server
to run the server in watch mode
```
docker compose -f docker-compose.dev.yml up
```
