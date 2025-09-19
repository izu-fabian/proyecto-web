# Usar Node oficial
FROM node:18

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para correr la app
CMD ["npm", "run", "dev"]
