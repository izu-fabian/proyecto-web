// Cargar variables de entorno
require('dotenv').config({ path: __dirname + '/.env' });
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

console.log("MONGO_URI desde .env:", MONGO_URI); // Debe mostrar tu URI

// Importar módulos
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Conexión a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error de conexión a Mongo:", err));

// Middleware
app.use(express.json());

// Servir frontend
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Conectar rutas API de usuarios
const userRoutes = require('./routes/userRoutes'); // Ajusta si tu carpeta se llama "routes"
app.use('/api/users', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
