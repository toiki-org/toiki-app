FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN yarn global add typescript

RUN yarn install

ADD https://toiki-bucket.s3.us-east-2.amazonaws.com/web.zip public

EXPOSE 80

CMD [ "yarn", "start" ]
