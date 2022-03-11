FROM node:alpine

ENV NODE_OPTIONS --openssl-legacy-provider

WORKDIR /app

EXPOSE 3000

COPY package.json ./

RUN 
RUN apk add --no-cache make gcc g++ python3 && \
  npm install --legacy-peer-deps && \
  apk del make gcc g++ python3

ENV HOST 0.0.0.0

COPY . .

CMD ["npm", "run", "dev"]