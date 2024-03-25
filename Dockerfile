FROM node:20.0-alpine as service

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./dist .

EXPOSE 3000
CMD node ${INSPECT} "--watch" "./src/index.js"