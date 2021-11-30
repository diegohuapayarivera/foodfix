# Dockerfile
FROM node:14.9.0-alpine

WORKDIR /app

COPY . /app

RUN npm install -g live-server
RUN npm install express

EXPOSE 3030
CMD npm start