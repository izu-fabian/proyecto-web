const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    identificacion: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rol: { type: String, required: true },
    status: { type: String, required: true },
    password: { type: String, required: true },
    siguiendo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
