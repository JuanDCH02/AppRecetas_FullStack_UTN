
const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  usuario: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuarios')
// El tercer parámetro 'recetas' fuerza el nombre exacto de la colección en MongoDB