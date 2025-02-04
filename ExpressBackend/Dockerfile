FROM node:20-alpine
WORKDIR /app
RUN npm install -g nodemon
COPY . /app
RUN npm ci
CMD ["nodemon", "--legacy-watch", "server.js"]