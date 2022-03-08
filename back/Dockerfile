FROM node:13.0-alpine

ENV NODE_ENV=development

WORKDIR /app

EXPOSE 4000

COPY package.json ./

RUN npm install

ENV HOST 0.0.0.0

COPY . .

CMD ["npm", "run", "dev"]