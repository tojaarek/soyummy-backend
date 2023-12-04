const express = require('express');
const { authMiddleware } = require('../service/auth.service.js');
const {
  getShoppingListHandler,
  addIngredientHandler,
  deleteIngredientHandler,
} = require('../controllers/shoppingList.controller.js');

const shoppingListRouter = express.Router();

shoppingListRouter.get('/', authMiddleware, getShoppingListHandler);
shoppingListRouter.post('/add', authMiddleware, addIngredientHandler);
shoppingListRouter.delete('/:index', authMiddleware, deleteIngredientHandler);

module.exports = shoppingListRouter;
