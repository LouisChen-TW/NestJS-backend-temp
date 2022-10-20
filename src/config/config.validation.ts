import Joi from 'joi';

export const configValidation = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .required(),
  PORT: Joi.number().default(3000),

  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.number().required(),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_USERNAME: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRED_IN: Joi.string().required(),
});
