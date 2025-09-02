import Joi from 'joi';

export const createBookSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  author: Joi.string().min(1).max(120).required(),
  isbn: Joi.string().min(5).max(40).required(),
  copiesAvailable: Joi.number().integer().min(0).required()
});

export const updateBookSchema = Joi.object({
  title: Joi.string().min(1).max(200),
  author: Joi.string().min(1).max(120),
  isbn: Joi.string().min(5).max(40),
  copiesAvailable: Joi.number().integer().min(0)
}).min(1);

export const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  q: Joi.string().allow('', null)
});
