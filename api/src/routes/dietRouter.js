const {Router} = require('express');
const { dietsDB } = require('../handlers/dietsDB');
const dietRouter = Router();

dietRouter.get('/', dietsDB);

module.exports = dietRouter;