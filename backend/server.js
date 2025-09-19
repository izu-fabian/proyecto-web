require('dotenv').config({ path: __dirname + '/.env' });
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

console.log("MONGO_URI desde .env:", MONGO_URI);

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
app.use(express.urlencoded({ extended: true }));

// Servir frontend
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/formulario.html', (req, res) => {
  res.sendFile(path.join(frontendPath, 'formulario.html'));
});

// Rutas API
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
