FROM dart:2.18

RUN apt-get update && apt-get install -y unzip wget xz-utils

WORKDIR /usr

# Install Flutter
RUN wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.0.5-stable.tar.xz
RUN tar xf flutter_linux_3.0.5-stable.tar.xz

# Set the PATH environment variable for the Flutter executable
ENV PATH "$PATH:/usr/flutter/bin"

# Install webdev
RUN flutter pub global activate webdev

# Set the PATH environment variable for the webdev executable
ENV PATH "$PATH:/root/.pub-cache/bin"

WORKDIR /app

COPY . .

RUN flutter pub get

# Build the Flutter application for the web
RUN flutter build web
