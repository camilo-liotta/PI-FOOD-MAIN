const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const recipeRouter = require('./recipeRouter')
const dietRouter = require('./dietRouter')


router.use("/recipes", recipeRouter);
router.use("/diets", dietRouter);

module.exports = router;
