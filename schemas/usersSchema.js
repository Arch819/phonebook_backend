const Joi = require("joi");

const userSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { userSignupSchema };
