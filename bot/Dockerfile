ARG COMMON_IMAGE=ghcr.io/toiki-org/toiki-common:latest

FROM $COMMON_IMAGE as common

FROM node:20-alpine as build
WORKDIR /app
COPY --from=common /app /common
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build

# stage to install only production deps
FROM node:18-alpine as deps
WORKDIR /app
COPY --from=common /app /common
ENV NODE_ENV=production
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile --production

## this is stage two, where the app actually runs
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
COPY yarn.lock ./
COPY --from=build /app/build ./build/
COPY --from=deps /app/node_modules ./node_modules/
RUN ls -a
CMD [ "yarn", "start:prod"]
