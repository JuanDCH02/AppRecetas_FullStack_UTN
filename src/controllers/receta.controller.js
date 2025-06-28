const recetaService = require('../services/receta.service')



const getAllRecetas = async (req, res) => {
  try {
    const category = req.query.categoria; // ?categoria=veggie
    const recipes = await recetaService.getAllRecetas(category);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las recetas' });
  }
};
const getRecetaById = async (req, res) => {
  try {
    const recipe = await recetaService.getRecetaById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la receta' });
  }
};

const createReceta = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { recName, category, time, portions, preparation } = req.body;

    // Asegurate que ingredients esté presente
    let ingredients;
    try {
      ingredients = JSON.parse(req.body.ingredients);
    } catch (err) {
      return res.status(400).json({ message: 'Ingredientes inválidos' });
    }

    const imageUrl = req.file?.filename;
    if (!imageUrl) return res.status(400).json({ message: 'Imagen faltante' });

    const nuevaReceta = {
      recName,
      category,
      time: Number(time),
      portions: Number(portions),
      preparation,
      ingredients,
      imageUrl,
    };

    const recetaCreada = await recetaService.createReceta(nuevaReceta);
    res.status(201).json(recetaCreada);
  } catch (error) {
    console.error('Error al crear receta:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};



const updateReceta = async (req, res) => {
  try {
    const recipeUpdated = await recetaService.updateReceta(req.params.id, req.body);
    if (!recipeUpdated) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.json(recipeUpdated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la receta' });
  }
};
const deleteReceta = async (req, res) => {
  try {
    const recipeDeleted = await recetaService.deleteReceta(req.params.id);
    if (!recipeDeleted) {
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