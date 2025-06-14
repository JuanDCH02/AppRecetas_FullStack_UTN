const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: {type: Number, default:10},
  portions: {type: Number, default: 1},
  ingredients: {type: [String], min: 2},
  preparation: {type: String, required:true},
  category: {type: String, required:true}
});

module.exports = mongoose.model('Receta', recetaSchema, 'recetas'); 
// El tercer parámetro 'recetas' fuerza el nombre exacto de la colección en MongoDB
