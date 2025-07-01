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
    let { name, category, time, portions, preparation, ingredients } = req.body;
    if (typeof ingredients === 'string') {
      try {
        ingredients = JSON.parse(ingredients);
      } catch (e) {
        return res.status(400).json({ message: 'Formato de ingredientes inválido' });
      }
    }
    const imageUrl = req.file?.filename || req.body.imageUrl;
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
  console.log('BODY:', req.body);
    console.log('FILE:', req.file);
  try {
    const { name, category, time, portions, preparation, ingredients } = req.body;

    let parsedIngredients = ingredients;
    if (typeof ingredients === 'string') {
      try {
        parsedIngredients = JSON.parse(ingredients);
      } catch (e) {
        return res.status(400).json({ message: 'Formato de ingredientes inválido' });
      }
    }
    const recetaActual = await recetaService.getRecetaById(req.params.id);
    if (!recetaActual) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    const imageUrl = req.file?.filename || recetaActual.imageUrl;

    const updatedData = {
      name,
      category,
      time: Number(time),
      portions: Number(portions),
      preparation,
      ingredients: parsedIngredients,
      imageUrl,
    };
    console.log('Actualizando receta con:', updatedData);
    const recetaActualizada = await recetaService.updateReceta(req.params.id, updatedData);
    res.json(recetaActualizada);
  } catch (error) {
    console.error('Error al actualizar receta:', error);
    res.status(500).json({ message: 'Error al actualizar la receta', error: error.message });
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