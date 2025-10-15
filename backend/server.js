// server.js
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

// === Configurar entorno ===
const envPath = fs.existsSync(path.join(__dirname, ".env"))
  ? path.join(__dirname, ".env")
  : path.join(__dirname, ".env.example");
dotenv.config({ path: envPath });
console.log(`[🌱] Cargando variables desde: ${path.basename(envPath)}`);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

console.log("MONGO_URL:", MONGO_URL);

// === Inicializar Express ===
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Rutas API (PRIMERO!) ===
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// === Servir frontend ===
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

app.get("/", (req, res) => res.sendFile(path.join(frontendPath, "index.html")));
app.get("/Registro.html", (req, res) => res.sendFile(path.join(frontendPath, "Registro.html")));
app.get("/perfil_user.html", (req, res) => res.sendFile(path.join(frontendPath, "perfil_user.html")));

// === Conexión MongoDB ===
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => {
    console.error("❌ Error al conectar con MongoDB:", err.message);
    process.exit(1);
  });

// === Iniciar servidor ===
const http = require("http");
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Puerto ${PORT} en uso. Libéralo o cambia el número.`);
    process.exit(1);
  } else {
    throw err;
  }
});
