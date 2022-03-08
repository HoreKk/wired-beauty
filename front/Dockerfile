FROM node:alpine

ENV NODE_OPTIONS --openssl-legacy-provider

WORKDIR /app

EXPOSE 3000

COPY package.json ./

RUN npm install

ENV HOST 0.0.0.0

COPY . .

CMD ["npm", "run", "dev"]