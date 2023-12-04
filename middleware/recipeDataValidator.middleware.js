const Joi = require('joi');

const addRecipeSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  instructions: Joi.array().required(),
  description: Joi.string().required(),
  thumb: Joi.string(),
  time: Joi.string().required(),
  ingredients: Joi.array().required(),
});

const addRecipeValidator = (req, res, next) => {
  const { error } = addRecipeSchema.validate(req.body);

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
  addRecipeValidator,
};
