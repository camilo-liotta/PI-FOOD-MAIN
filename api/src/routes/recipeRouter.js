const {Router} = require('express');
const recipeRouter = Router();
const { recipeById } = require('../handlers/RecipeById');
const { recipeByName } = require('../handlers/recipeByName');
const { recipePost } = require('../handlers/recipePost');


recipeRouter.get('/:id', recipeById);


recipeRouter.get('/', recipeByName);


recipeRouter.post('/', recipePost)


module.exports = recipeRouter;