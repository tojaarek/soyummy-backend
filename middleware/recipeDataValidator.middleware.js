const Joi = require('joi');
const { upload } = require('../middleware/multer.middleware.js');

const addRecipeSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
  time: Joi.string().required(),
  ingredients: Joi.string().required(),
});

const addRecipeValidator = (req, res, next) => {
  upload.single('thumb')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: err.message,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Image file is required',
      });
    }

    const { title, category, instructions, description, time, ingredients } =
      req.body;

    const { error } = addRecipeSchema.validate({
      title,
      category,
      instructions,
      description,
      time,
      ingredients,
    });

    if (error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: error.message,
      });
    }

    return next();
  });
};

module.exports = {
  addRecipeValidator,
};
