const Joi = require('joi');

const userNameSchema = Joi.object({
  name: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,30}$')),
});

const userNameValidator = (req, res, next) => {
  const { error } = userNameSchema.validate(req.body);

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
  userNameValidator,
};
