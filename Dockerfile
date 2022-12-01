FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN yarn global add typescript

RUN yarn install

EXPOSE 80

CMD [ "yarn", "start" ]
