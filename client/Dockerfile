ARG COMMON_IMAGE=ghcr.io/toiki-org/toiki-common:latest

FROM $COMMON_IMAGE as common

FROM node:20-alpine as build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
WORKDIR /app
COPY --from=common /app /common
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
COPY yarn.lock ./
COPY --from=build /app/dist ./dist/
RUN ls -a
