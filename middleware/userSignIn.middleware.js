const Joi = require('joi');

const userSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userSignInValidator = (req, res, next) => {
  const { error } = userSignInSchema.validate(req.body);

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
  userSignInValidator,
};
