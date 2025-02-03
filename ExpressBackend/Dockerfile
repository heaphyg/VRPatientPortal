FROM node:20-alpine
WORKDIR /app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm ci
COPY . /app
CMD ["nodemon", "--legacy-watch", "server.js"]