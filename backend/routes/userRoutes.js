const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

// -----------------------
// Obtener todos los usuarios (sin password)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// -----------------------
// Crear usuario
router.post("/", async (req, res) => {
  const { identificacion, nombre, apellido, telefono, email, rol, status, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      identificacion,
      nombre,
      apellido,
      telefono,
      email,
      rol,
      status,
      password: hashedPassword,
      siguiendo: [] // Lista inicial vacía
    });

    await newUser.save(); 
    res.status(201).json({ message: "Usuario creado ✅", user: newUser }); 
  } catch (err) {
    res.status(400).json({ error: "Error al crear usuario" });
  }
});

// -----------------------
// Login de usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Contraseña incorrecta" });

    res.json({
      message: "Acceso concedido ✅",
      user: {
        id: user._id,
        identificacion: user.identificacion,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol,
        status: user.status,
        siguiendo: user.siguiendo || []
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// -----------------------
// Seguir / dejar de seguir usuario
router.post("/follow/:id", async (req, res) => {
  const userId = req.body.userId;  // quien sigue
  const targetId = req.params.id;  // a quién sigue

  if (!userId) return res.status(400).json({ message: "Falta userId en body" });
  if (userId === targetId) return res.status(400).json({ message: "No puedes seguirte a ti mismo" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Convertir ObjectId a string para comparar correctamente
    const siguiendoStrings = user.siguiendo.map(id => id.toString());
    if (!siguiendoStrings.includes(targetId)) {
      // Seguir
      user.siguiendo.push(targetId);
    } else {
      // Dejar de seguir
      user.siguiendo = user.siguiendo.filter(id => id.toString() !== targetId);
    }

    await user.save();
    res.json({ message: "Acción completada ✅", siguiendo: user.siguiendo.map(id => id.toString()) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar seguimiento" });
  }
});

module.exports = router;
