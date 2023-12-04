const {
  addOwnRecipe,
  getOwnRecipes,
  deleteOwnRecipe,
} = require('../service/ownRecipes.service.js');
const { getRecipeById } = require('../service/recipes.service.js');
const { getUser } = require('../service/users.service.js');

const addOwnRecipeHandler = async (req, res, next) => {
  try {
    const { _id } = req.user._id;
    const {
      title,
      category,
      instructions,
      description,
      thumb,
      time,
      ingredients,
    } = req.body;
    const currentUser = await getUser({ _id: _id });
    const recipeData = {
      title,
      category,
      instructions,
      description,
      thumb,
      time,
      ingredients,
      owner: currentUser._id,
    };
    const newRecipe = await addOwnRecipe(recipeData);
    if (!newRecipe) {
      res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Internal Server Error',
      });
    }
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Created',
      recipe: {
        newRecipe,
      },
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const deleteOwnRecipeHandler = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user._id;
    const recipe = await getRecipeById(recipeId);
    if (recipe === null) {
      res.status(404).json({
        status: 'fail',
        code: 404,
        message: 'Not found',
      });
    }
    if (recipe.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        status: 'error',
        code: 403,
        message: 'Forbidden',
      });
    }
    await deleteOwnRecipe(req.params.recipeId);
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Recipe deleted',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getOwnRecipesHandler = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const filter = { owner: req.user._id };

    const recipes = await getOwnRecipes(filter, page, limit);

    if (recipes === null) {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Internal Server Error',
      });
    }

    if (recipes.length === 0) {
      return res.status(204).json({
        status: 'success',
        code: 204,
        message: 'No content',
        recipes: {
          recipes,
        },
      });
    }

    const totalPages = Math.ceil(totalRecipes / limit);

    res.status(200).json({
      status: 'success',
      code: 200,
      recipes: {
        page: page,
        perPage: limit,
        totalPages: totalPages,
        totalRecipes: totalRecipes,
        recipes,
      },
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  addOwnRecipeHandler,
  deleteOwnRecipeHandler,
  getOwnRecipesHandler,
};
