FROM node:21

ENV NODE_ENV development

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY .env ./build

WORKDIR /usr/app/build

EXPOSE 3333

CMD ["npm", "start"]
