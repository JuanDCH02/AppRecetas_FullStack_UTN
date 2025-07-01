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
    let { name, category, time, portions, preparation, ingredients } = req.body;
    if (typeof ingredients === 'string') {
      try {
        ingredients = JSON.parse(ingredients);
      } catch (e) {
        return res.status(400).json({ message: 'Formato de ingredientes inválido' });
      }
    }
    const imageUrl = req.file?.filename;
    if (!imageUrl) return res.status(400).json({ message: 'Imagen faltante' });
    const newRecipe = {
      name,
      category,
      time: Number(time),
      portions: Number(portions),
      preparation,
      ingredients,
      imageUrl,
    };
    const recipeCreated = await recetaService.createReceta(newRecipe);
    res.status(201).json(recipeCreated);
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