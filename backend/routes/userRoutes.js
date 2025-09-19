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
