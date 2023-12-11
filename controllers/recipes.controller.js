const {
  addRecipe,
  getOwnRecipes,
  getRecipeById,
  deleteRecipe,
  getCategories,
  resizeRecipePhoto,
  getPopularRecipes,
  getCategoryRecipes,
  getRecipesByTitle,
  getRecipesMainPage,
} = require('../service/recipes.service.js');
const { getUser } = require('../service/users.service.js');
const { Recipe } = require('../models/recipes.model.js');

const addRecipeHandler = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { title, category, instructions, description, time, ingredients } =
      req.body;
    const thumb = req.file.path;
    const mimetype = req.file.mimetype;
    const picture = await resizeRecipePhoto(thumb, _id, title, mimetype);
    const currentUser = await getUser({ _id: _id });
    const ingredientsArray = JSON.parse(ingredients);

    const recipeData = {
      title,
      category,
      instructions,
      description,
      thumb: `https://soyummy-h1wx.onrender.com/thumbs/${picture}`,
      time,
      ingredients: ingredientsArray,
      owner: currentUser._id,
    };
    const newRecipe = await addRecipe(recipeData);
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

const deleteRecipeHandler = async (req, res, next) => {
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
    await deleteRecipe(req.params.recipeId);
    return res.status(200).json({
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
    const totalRecipes = await Recipe.countDocuments(filter);
    const totalPages = Math.ceil(totalRecipes / limit);

    if (recipes === null) {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Internal Server Error',
      });
    }

    if (recipes.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        code: 404,
        message: 'No recipes found',
      });
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      recipes: {
        page: page,
        perPage: limit,
        totalPages: totalPages,
        totalRecipes: totalRecipes,
        data: recipes,
      },
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getCategoriesHandler = async (req, res, next) => {
  try {
    const data = await getCategories();
    console.log(data);

    if (data.length > 0) {
      const categories = data.map(({ _id, title, thumb, description }) => ({
        id: _id,
        name: title,
        description,
        thumb,
      }));
      return res.status(200).json({
        status: 'OK',
        code: 200,
        categories,
      });
    } else {
      return res.status(404).json({
        status: 'Not Found',
        code: 404,
        message: 'No categories found',
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getPopularRecipesHandler = async (req, res, next) => {
  try {
    const data = await getPopularRecipes();

    if (data) {
      const recipes = data.map(({ _id, title, description, thumb }) => ({
        id: _id,
        title,
        description,
        thumb,
      }));
      return res.status(200).json({
        status: 'OK',
        code: 200,
        recipes,
      });
    } else {
      return res.status(404).json({
        status: 'Not Found',
        code: 404,
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getCategoryRecipesHandler = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const data = await getCategoryRecipes(categoryId);

    if (data.length > 0) {
      return res.status(200).json({
        status: 'OK',
        code: 200,
        data,
      });
    } else {
      return res.status(404).json({
        status: 'Not Found',
        code: 404,
        message: 'No recipes found',
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getRecipeByIdHandler = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await getRecipeById(recipeId);

    if (recipe === null) {
      return res.status(404).json({
        status: 'fail',
        code: 404,
        message: 'Not found',
      });
    }

    if (recipe.owner) {
      const userId = req.user.id;
      if (recipe.owner.id !== userId) {
        return res.status(403).json({
          status: 'fail',
          code: 403,
          message: 'Forbidden',
        });
      }
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      recipe,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getRecipesByTitleHandler = async (req, res, next) => {
  try {
    const params = req.query.q;
    const recipes = await getRecipesByTitle(params);
    if (recipes === null) {
      res.status(404).json({
        status: 'fail',
        code: 404,
        message: 'Not found',
      });
    }

    const data = recipes.map((recipe) => ({
      id: recipe._id,
      title: recipe.title,
      thumb: recipe.thumb,
    }));

    res.status(200).json({
      status: 'success',
      code: 200,
      data,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getRecipesMainPageHandler = async (req, res, next) => {
  try {
    const recipes = await getRecipesMainPage();
    if (recipes === null) {
      res.status(404).json({
        status: 'fail',
        code: 404,
        message: 'Not found',
      });
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      recipes,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  addRecipeHandler,
  deleteRecipeHandler,
  getOwnRecipesHandler,
  getCategoriesHandler,
  getPopularRecipesHandler,
  getCategoryRecipesHandler,
  getRecipeByIdHandler,
  getRecipesByTitleHandler,
  getRecipesMainPageHandler,
};
