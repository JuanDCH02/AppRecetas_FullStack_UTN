const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/receta.controller');
const upload = require('../middlewares/multer.middleware')

router.post('/', upload.single('image'),recetaController.createReceta);
router.get('/', recetaController.getAllRecetas);
router.get('/:id', recetaController.getRecetaById);
router.put('/:id', recetaController.updateReceta);
router.delete('/:id', recetaController.deleteReceta);

module.exports = router;