const express = require('express');
const { authMiddleware } = require('../service/auth.service.js');
const {
  addRecipeHandler,
  deleteRecipeHandler,
  getOwnRecipesHandler,
} = require('../controllers/recipes.controller.js');
const {
  addRecipeValidator,
} = require('../middleware/recipeDataValidator.middleware.js');
const { upload } = require('../middleware/multer.middleware.js');

const ownRecipesRouter = express.Router();

ownRecipesRouter.get('/', authMiddleware, getOwnRecipesHandler);
ownRecipesRouter.post(
  '/add',
  authMiddleware,
  addRecipeHandler
);
ownRecipesRouter.delete('/:recipeId', authMiddleware, deleteRecipeHandler);

module.exports = ownRecipesRouter;
