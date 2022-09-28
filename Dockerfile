FROM node:18
WORKDIR /usr/src/Clean.Node-API
COPY package.json .
RUN npm install --omit=dev