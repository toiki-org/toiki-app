ARG ARCH=linux/amd64

FROM --platform=${ARCH} dart:3.3

ARG API_AUTHORITY

RUN apt-get update && apt-get install -y unzip wget xz-utils

WORKDIR /usr

RUN git clone https://github.com/flutter/flutter.git /usr/local/flutter
ENV PATH "$PATH:/usr/local/flutter/bin:/usr/local/flutter/bin/cache/dart-sdk/bin"

# Install webdev
RUN flutter pub global activate webdev

# Set the PATH environment variable for the webdev executable
ENV PATH "$PATH:/root/.pub-cache/bin"

WORKDIR /app

COPY . .

RUN flutter pub get

# Build the Flutter application for the web
RUN flutter build web --release  --dart-define API_AUTHORITY=${API_AUTHORITY}
