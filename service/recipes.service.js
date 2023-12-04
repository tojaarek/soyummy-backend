const { Recipe } = require('../models/recipes.model.js');
const { Category } = require('../models/categories.model');
const { UnknownDatabaseError } = require('../db.js');
const mimetypes = require('mime-types');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const addRecipe = async body => {
  try {
    const newRecipe = new Recipe(body);
    const saveRecipe = await newRecipe.save();
    return saveRecipe;
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

const getOwnRecipes = async (id, page = 1, limit = 4) => {
  try {
    const skip = (page - 1) * limit;
    const data = await Recipe.find(id).limit(limit).skip(skip);
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const getRecipeById = async recipeId => {
  try {
    const data = await Recipe.findById(recipeId);
    return data;
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

const deleteRecipe = async recipeId => {
  try {
    await Recipe.findByIdAndDelete(recipeId);
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

const getRecipesByTitle = async title => {
  try {
    const data = await Recipe.find({
      title: { $regex: title, $options: 'i' },
      owner: { $exists: false },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

const getCategories = async () => {
  try {
    const categories = await Category.find({});
    return categories;
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

const getCategoryRecipes = async categoryId => {
  try {
    const recipes = await Recipe.find({ category: categoryId });
    return recipes;
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

const resizeRecipePhoto = async (filePath, _id, title, mimetype) => {
  try {
    const formatTitle = title.replace(/ /g, '_');
    const fileName = `${_id}_${formatTitle}.${mimetypes.extension(mimetype)}`;
    const avatarImage = await Jimp.read(filePath);
    await avatarImage.resize(357, 344).writeAsync(filePath);
    await fs.rename(
      filePath,
      path.join(__dirname, '..', 'public/thumbs', fileName)
    );
    return fileName;
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

const getPopularRecipes = async () => {
  try {
    return Recipe.find({ favorites: { $exists: true, $ne: [] } })
      .sort({ favorites: -1 })
      .limit(4);
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

const getRecipesMainPage = async () => {
  try {
    const categories = ['Breakfast', 'Miscellaneous', 'Chicken', 'Desserts'];
    const result = {};

    for (const category of categories) {
      const recipes = await Recipe.find({ category }).limit(4);
      result[category] = recipes;
    }

    return result;
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

module.exports = {
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
};
