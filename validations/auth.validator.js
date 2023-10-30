const Joi = require ('joi');

const loginValidationSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
});

module.exports = { loginValidationSchema }