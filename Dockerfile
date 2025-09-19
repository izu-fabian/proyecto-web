FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Instala todas las dependencias y nodemon globalmente
RUN npm install && npm install -g nodemon

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
