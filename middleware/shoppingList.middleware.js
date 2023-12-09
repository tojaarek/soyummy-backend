const Joi = require('joi');

const IngredientSchema = Joi.object({
  _id: Joi.string().required(),
  title: Joi.string().required(),
  thumb: Joi.string().required(),
  measure: Joi.string().required(),
});

const shoppingListValidator = (req, res, next) => {
  const { error } = IngredientSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    });
  }

  return next();
};

module.exports = {
  shoppingListValidator,
};
