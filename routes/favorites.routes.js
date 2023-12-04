const express = require('express');
const { authMiddleware } = require('../service/auth.service.js');
const {
  getFavoritesHandler,
  addToFavoritesHandler,
  deleteFromFavoritesHandler,
} = require('../controllers/favorites.controller.js');

const favoritesRouter = express.Router();

favoritesRouter.get('/', authMiddleware, getFavoritesHandler);
favoritesRouter.post('/add', authMiddleware, addToFavoritesHandler);
favoritesRouter.delete('/delete', authMiddleware, deleteFromFavoritesHandler);
module.exports = favoritesRouter;
