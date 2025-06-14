const recetaService = require('../services/receta.service');

const getAllRecetas = async (req, res) => {
  try {
    const categoria = req.query.categoria; // ?categoria=veggie
    const recetas = await recetaService.getAllRecetas(categoria);
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las recetas' });
  }
};
const getRecetaById = async (req, res) => {
  try {
    const receta = await recetaService.getRecetaById(req.params.id);
    if (!receta) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.json(receta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la receta' });
  }
};

const createReceta = async (req, res) => {
  try {
    const nuevaReceta = await recetaService.createReceta(req.body);
    res.status(201).json(nuevaReceta);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la receta' });
  }
}

const updateReceta = async (req, res) => {
  try {
    const recetaActualizada = await recetaService.updateReceta(req.params.id, req.body);
    if (!recetaActualizada) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.json(recetaActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la receta' });
  }
};
const deleteReceta = async (req, res) => {
  try {
    const recetaEliminada = await recetaService.deleteReceta(req.params.id);
    if (!recetaEliminada) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.json({ message: 'Receta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la receta' });
  }
};
module.exports = {
  getAllRecetas,
  getRecetaById,
  createReceta,
  updateReceta,
  deleteReceta
};