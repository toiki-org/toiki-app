FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN yarn global add typescript

RUN yarn install

ARG S3_WEB_OBJECT

ADD $S3_WEB_OBJECT public

WORKDIR /usr/src/app/public

RUN unzip web.zip

EXPOSE 80

CMD [ "yarn", "start" ]
