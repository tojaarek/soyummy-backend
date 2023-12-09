const {
  getUserFavorites,
  addToFavorites,
  deleteFromFavorites,
} = require('../service/favorites.service.js');

const getFavoritesHandler = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const { data, totalCount } = await getUserFavorites(_id, page, limit);

    if (data.length > 0) {
      const favorites = data.map((favourite) => ({
        id: favourite._id,
        title: favourite.title,
        description: favourite.description,
        thumb: favourite.thumb,
        time: favourite.time,
      }));

      const totalPages = Math.ceil(totalCount / limit);

      return res.status(200).json({
        status: 'OK',
        code: 200,
        totalPages,
        data: favorites,
      });
    } else {
      return res.status(404).json({
        status: 'Not Found',
        code: 404,
        message: 'No favorites found',
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const addToFavoritesHandler = async (req, res, next) => {
  try {
    const { recipeId } = req.body;
    const { _id } = req.user;
    const data = await addToFavorites(recipeId, _id);

    if (!recipeId) {
      return res.status(400).json({
        status: 'Bad request',
        code: 400,
        message: 'recipeId id required',
      });
    }

    if (!data) {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Internal Server Error',
      });
    } else {
      return res.status(200).json({
        status: 'OK',
        code: 200,
        message: 'Recipe added to favorites',
        data,
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const deleteFromFavoritesHandler = async (req, res, next) => {
  try {
    const { recipeId } = req.body;
    const { _id } = req.user;
    const data = await deleteFromFavorites(recipeId, _id);

    if (!data) {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Internal Server Error',
      });
    } else {
      return res.status(200).json({
        status: 'OK',
        code: 200,
        message: 'Recipe deleted from favorites',
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  getFavoritesHandler,
  addToFavoritesHandler,
  deleteFromFavoritesHandler,
};
