FROM node:alpine

ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN apk add --no-cache make gcc g++ python3 && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python3

EXPOSE 4000

COPY . .

ENV HOST 0.0.0.0

CMD [ "nodemon", "index.js" ]
