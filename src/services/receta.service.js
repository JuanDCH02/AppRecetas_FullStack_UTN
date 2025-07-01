const Receta = require('../models/receta.model');

// Obtener todas las recetas o filtradas por categoría
const getAllRecetas = async (categoria) => {
  const query = categoria ? { category: categoria } : {};
  return await Receta.find(query);
};

// Obtener una receta por ID
const getRecetaById = async (id) => {
  return await Receta.findById(id);
};

// Crear una nueva receta
const createReceta = async (data) => {
  const nuevaReceta = new Receta(data);
  return await nuevaReceta.save();
};

// Actualizar una receta existente
const updateReceta = async (id, data) => {
  return await Receta.findByIdAndUpdate(id, data, {new: true});
};

// Eliminar una receta
const deleteReceta = async (id) => {
  return await Receta.findByIdAndDelete(id);
};

module.exports = {
  getAllRecetas,
  getRecetaById,
  createReceta,
  updateReceta,
  deleteReceta
};
