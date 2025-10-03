# Usar Node 18 Alpine
FROM node:18-alpine

# Crear carpeta de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias y nodemon global
RUN npm install && npm install -g nodemon

# Copiar todo el proyecto
COPY . .

# Exponer puerto
EXPOSE 5000

# Comando para correr el servidor con nodemon
CMD ["npm", "run", "dev"]
