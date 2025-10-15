PROYECTO WEB - DESCRIPCIÓN GENERAL
=============================================================
Este proyecto consiste en una aplicación web compuesta por un frontend (HTML, CSS) y un backend desarrollado con Node.js, el cual se despliega mediante contenedores Docker.

El objetivo principal es conectar un formulario del frontend con una base de datos MongoDB, gestionando usuarios a través de rutas definidas en el backend.
ESTRUCTURA DEL PROYECTO (FRONTEND, BACKEND, DOCKER)
=============================================================
Estructura general del proyecto:

/frontend → Contiene los archivos HTML y CSS (formulario principal e interfaz visual).
/backend → Contiene las rutas, controladores y módulos de conexión con la base de datos.
/docker → Incluye los archivos Dockerfile y docker-compose.yml para levantar el entorno.

El contenedor principal ejecuta el backend y se comunica con un contenedor adicional de MongoDB (versión 6).
CONECCIÓN CON MONGODB
=============================================================
El backend utiliza MongoDB como base de datos principal.

Opciones de conexión:
- Por medio de la interfaz de Mongo Compass.
- O directamente desde la terminal al ejecutar el contenedor Docker.

El archivo docker-compose.yml define el servicio de base de datos ‘mongo:6’, y las variables de entorno se configuran en el archivo .env para establecer la URL de conexión.
RUTAS DEL PROYECTO
=============================================================
Dentro del backend se encuentran las rutas principales en la carpeta /routes o /userRoutes.

Ejemplos:
- GET /api/users → Obtiene la lista de usuarios registrados.
- POST /api/users → Registra un nuevo usuario.
- PUT /api/users/:id → Actualiza información de un usuario.
- DELETE /api/users/:id → Elimina un usuario.

Cada ruta se encuentra enlazada con un controlador que define la lógica de conexión con MongoDB.
SUBIDA A GITHUB Y AUTOMATIZACIÓN CON ACTIONS Y S3
=============================================================
1) Crear el repositorio en GitHub.
2) Abrir Git Bash en la carpeta raíz del proyecto.
3) Ejecutar los comandos:
   git init
   git add .
   git commit -m "Primer commit del proyecto web"
   git remote add origin https://github.com/izu-fabian/proyecto-web
   git push origin main

4)Para automatizar el despliegue:
   - Se utiliza un archivo de workflow (.yml) en /.github/workflows/
   - Este archivo configura la acción para subir automáticamente los cambios a AWS S3 cada vez que se haga un push.

5) caso de error con versiones de Node, modificar el Dockerfile cambiando la versión a node:22.

=============================================================
CORRECCIONES DE COMANDOS
- git init / git push → Para inicializar y subir el repositorio.
- npm install / npm run dev → Para instalar dependencias y ejecutar el servidor.

4) AUTOMATIZAR EL DESPLIEGUE CON GITHUB ACTIONS  
- Crear un archivo de workflow `.yml` dentro de la carpeta:  
  `.github/workflows/`  
- Este archivo se encarga de **subir automáticamente los cambios a AWS S3** cada vez que se hace un push a la rama principal (`main`).

5) CASO DE ERROR CON VERSIONES DE NODE  
- Si ocurre un error por versiones, modificar el `Dockerfile` cambiando la imagen a:  
  `node:22`  

=============================================================
CORRECCIONES DE COMANDOS
=============================================================
- `git init` / `git push` → Para inicializar y subir el repositorio.  
- `npm install` / `npm run dev` → Para instalar dependencias y ejecutar el servidor.

=============================================================
CREACIÓN Y CONFIGURACIÓN DEL BUCKET S3 PASO A PASO
=============================================================

1) ENTRAR A LA CONSOLA DE AWS  
Ingresé a AWS Management Console y seleccioné el servicio **S3**.

2) CREAR UN BUCKET  
- Le asigné un nombre al bucket.  
- Elegí una región (por ejemplo: `us-east-1`).  
- Desactivé la opción "Bloquear acceso público" para permitir el acceso web.  

3) ACTIVAR HOSTING ESTÁTICO  
- En la configuración del bucket, habilité la opción "Static Website Hosting".  
- Definí como archivo de inicio: `index.html`.  
- (Opcional) Definí un archivo de error: `error.html`.  

4) SUBIR LOS ARCHIVOS DEL PROYECTO  
- Subí los archivos de mi sitio (HTML, CSS e imágenes).  
- Pude hacerlo mediante comandos o directamente desde la **consola gráfica de AWS**, y elegí esta última opción.  

5) CONFIGURAR PERMISOS  
- Ajusté la "política del bucket" para permitir el acceso público a los objetos.  
- Esto permitió que cualquier persona con el enlace pudiera visualizar mi página web.  

6) OBTENER LA URL DEL SITIO  
- AWS generó automáticamente un enlace similar a:  
http://izurieta-joaquin-s3-888577051331.s3-website.us-east-2.amazonaws.com
ejemplo2:http://guillermo-chate-s3-888577051331.s3-website.us-east-2.amazonaws.com
