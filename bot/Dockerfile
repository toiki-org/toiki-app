FROM node:16-alpine as build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
RUN npm run build

# stage to install only production deps
FROM node:16-alpine as deps
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile --production

## this is stage two, where the app actually runs
FROM node:16-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
COPY yarn.lock ./
COPY --from=build /app/build ./build/
COPY --from=deps /app/node_modules ./node_modules/
RUN ls -a
CMD [ "yarn", "start:prod"]
