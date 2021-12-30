const Joi = require("joi");

const discussionValidationSchema = Joi.object().keys({
  title: Joi.string().required().max(150),
  author: Joi.string().required(),
  content: Joi.string().default(""),
});

const commentValidationSchema = Joi.object().keys({
  author: Joi.string().required(),
  content: Joi.string().required().max(500),
});

module.exports = { discussionValidationSchema, commentValidationSchema };
