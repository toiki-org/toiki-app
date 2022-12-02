### Client

FROM ubuntu:20.04 as builder

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y curl git wget unzip libgconf-2-4 gdb libstdc++6 libglu1-mesa fonts-droid-fallback lib32stdc++6 python3
RUN apt-get clean

RUN git clone https://github.com/flutter/flutter.git /usr/local/flutter

ENV PATH="/usr/local/flutter/bin:/usr/local/flutter/bin/cache/dart-sdk/bin:${PATH}"

# RUN flutter doctor

RUN chown -R $USER /usr/bin/tar

RUN flutter channel master
RUN flutter upgrade
RUN flutter config --enable-web

RUN mkdir /app/
COPY client /app/
WORKDIR /app/
RUN flutter build web

### Server

FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN yarn global add typescript

RUN yarn install

COPY --from=builder /app/build/web public

EXPOSE 80

CMD [ "yarn", "start" ]
