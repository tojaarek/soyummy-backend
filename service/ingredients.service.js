const { Ingredient } = require('../models/ingredients.model');
const { UnknownDatabaseError } = require('../db.js');

const getIngredients = async () => {
  try {
    const ingredients = await Ingredient.find({});
    return ingredients;
  } catch (error) {
    console.error(error);
    throw new UnknownDatabaseError();
  }
};

module.exports = {
  getIngredients,
};
