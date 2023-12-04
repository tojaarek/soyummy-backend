const { Recipe } = require('../models/recipes.model.js');
const { UnknownDatabaseError } = require('../db.js');

const addOwnRecipe = async body => {
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

const deleteOwnRecipe = async recipeId => {
  try {
    await Recipe.findByIdAndDelete(recipeId);
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

module.exports = {
  addOwnRecipe,
  getOwnRecipes,
  deleteOwnRecipe,
};
