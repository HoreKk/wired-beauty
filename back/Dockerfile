FROM node:alpine

ENV NODE_ENV=development

WORKDIR /app

EXPOSE 4000

COPY . ./

RUN npm i

ENV HOST 0.0.0.0

CMD ["npm", "run", "dev"]
