const {
  getShoppingList,
  addToShoppingList,
  deleteFromShoppingList,
} = require('../service/shoppingList.service.js');

const addIngredientHandler = async (req, res, next) => {
  try {
    const userId = { owner: req.user._id };
    const { _id, title, thumb, measure } = req.body;

    const newIngredient = await addToShoppingList(userId, {
      _id,
      title,
      thumb,
      measure,
    });
    if (!newIngredient) {
      res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Internal Server Error',
      });
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Ingredient added',
      newIngredient,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const deleteIngredientHandler = async (req, res, next) => {
  try {
    const userId = { owner: req.user._id };
    const index = req.params.index;

    const deleteIngredient = deleteFromShoppingList(userId, index);

    if (!deleteIngredient) {
      res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Internal Server Error',
      });
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Ingredient deleted',
      deletedIngredient: index,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getShoppingListHandler = async (req, res, next) => {
  try {
    const id = { owner: req.user._id };
    const { ingredients } = await getShoppingList(id);

    if (ingredients === null) {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Internal Server Error',
      });
    }

    if (ingredients.length === 0) {
      return res.status(204).json({
        status: 'success',
        code: 204,
        message: 'No content',
      });
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      ingredients,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  addIngredientHandler,
  getShoppingListHandler,
  deleteIngredientHandler,
};
