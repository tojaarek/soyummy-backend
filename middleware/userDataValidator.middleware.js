const Joi = require('joi');

const userRegistrationSchema = Joi.object({
  name: Joi.string().required().min(3).max(50).alphanum(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(6)
    .max(60)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
});

const userRegisterValidator = (req, res, next) => {
  const { error } = userRegistrationSchema.validate(req.body);

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
  userRegisterValidator,
};
