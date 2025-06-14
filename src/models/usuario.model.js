
const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', usuarioSchema, 'usuarios')
// El tercer parámetro 'recetas' fuerza el nombre exacto de la colección en MongoDB