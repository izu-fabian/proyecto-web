FROM node:18-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del backend
EXPOSE 5000

# Comando para iniciar la app
CMD ["npm", "start"]
