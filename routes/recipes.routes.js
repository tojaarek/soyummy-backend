const express = require('express');
const { authMiddleware } = require('../service/auth.service.js');
const {
  getCategoriesHandler,
  getPopularRecipesHandler,
  getCategoryRecipesHandler,
  getRecipeByIdHandler,
  getRecipesByTitleHandler,
  getRecipesMainPageHandler,
} = require('../controllers/recipes.controller.js');

const recipesRouter = express.Router();

recipesRouter.get('/category-list', authMiddleware, getCategoriesHandler);
recipesRouter.get(
  '/category/:categoryId',
  authMiddleware,
  getCategoryRecipesHandler
);
recipesRouter.get('/popular-recipe', authMiddleware, getPopularRecipesHandler);
recipesRouter.get('/main-page', authMiddleware, getRecipesMainPageHandler);
recipesRouter.get('/search', authMiddleware, getRecipesByTitleHandler);
recipesRouter.get('/:recipeId', authMiddleware, getRecipeByIdHandler);
module.exports = recipesRouter;
