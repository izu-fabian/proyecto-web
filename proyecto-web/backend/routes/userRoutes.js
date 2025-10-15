const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Crear usuario
router.post("/", async (req, res) => {
  console.log("🚀 Petición POST recibida:", req.body);
  try {
    const {
      identificacion,
      nombre,
      apellido,
      telefono,
      email,
      rol,
      status,
      password,
    } = req.body;

    const newUser = new User({
      identificacion,
      nombre,
      apellido,
      telefono,
      email,
      rol,
      status,
      password,
    });

    await newUser.save(); 
    res.status(201).json(newUser); 
  } catch (err) {
    console.error("❌ Error al crear usuario:", err);
    res.status(400).json({ error: "Error al crear usuario" });
  }
});

module.exports = router;
// Verificar usuario (LOGIN)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por correo
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Validar contraseña
    if (user.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Si llega aquí, el login es correcto
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (err) {
    console.error("❌ Error al iniciar sesión:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
// Verificar login (email y contraseña)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña (por ahora texto plano)
    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Si todo está bien
    res.status(200).json({ message: "✅ Login exitoso", user });
  } catch (err) {
    console.error("Error al verificar login:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});
