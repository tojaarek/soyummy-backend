const express = require('express');
const { authMiddleware } = require('../service/auth.service.js');
const {
  getAllIngredientsHandler,
} = require('../controllers/ingredients.controller.js');

const ingredientsRouter = express.Router();

ingredientsRouter.get('/list', authMiddleware, getAllIngredientsHandler);

module.exports = ingredientsRouter;
