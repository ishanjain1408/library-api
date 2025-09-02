import Joi from 'joi';

export const borrowParamsSchema = Joi.object({
  bookId: Joi.string().hex().length(24).required()
});

export const returnParamsSchema = Joi.object({
  loanId: Joi.string().hex().length(24).required()
});
