const { Recipe } = require('../models/recipes.model.js');
const { UnknownDatabaseError } = require('../db.js');

const addToFavorites = async (recipeId, userId) => {
  try {
    const update = await Recipe.findByIdAndUpdate(
      recipeId,
      { $addToSet: { favorites: userId } },
      { new: true }
    );
    return update;
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

const getUserFavorites = async (userId, page = 1, limit = 4) => {
  try {
    const skip = (page - 1) * limit;
    const data = await Recipe.find({ favorites: userId });
    const totalCount = data.length;
    const recipes = await Recipe.find({ _id: { $in: data } })
      .limit(limit)
      .skip(skip);
    return { data: recipes, totalCount };
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

const deleteFromFavorites = async (recipeId, userId) => {
  try {
    const update = await Recipe.findByIdAndUpdate(
      recipeId,
      { $pull: { favorites: userId } },
      { new: true }
    );
    return update;
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

module.exports = {
  getUserFavorites,
  addToFavorites,
  deleteFromFavorites,
};
