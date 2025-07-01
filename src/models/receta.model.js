const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: {type: Number, default:10},
  portions: {type: Number, default: 1},
  ingredients: [{
      ingName: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true }
    }],
  preparation: {type: String, required:true},
  category: {type: String, required:true},
  imageUrl:{type:String, required:true}
});

module.exports = mongoose.model('Receta', recetaSchema, 'recetas'); 
// El tercer parametro 'recetas' fuerza el nombre exacto de la coleccion en MongoDB
