FROM node:20-alpine as build
WORKDIR /app
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
COPY --from=build /app/build ./build/
RUN ls -a
