const { getIngredients } = require('../service/ingredients.service.js');

const getAllIngredientsHandler = async (req, res, next) => {
  try {
    const data = await getIngredients();

    if (data.length > 0) {
      const ingredients = data.map(({ _id, title, description, thumb }) => ({
        id: _id,
        name: title,
        description,
        thumb,
      }));
      return res.status(200).json({
        status: 'OK',
        code: 200,
        ingredients: ingredients,
      });
    } else {
      return res.status(404).json({
        status: 'Not Found',
        code: 404,
        message: 'No ingredients found',
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  getAllIngredientsHandler,
};
