import ApiError from '../utils/ApiError.js';

export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], { abortEarly: false, stripUnknown: true });

    if (error) {
      return next(new ApiError(400, error.details.map(d => d.message).join(', ')));
    }

    if (property === 'query') {
      Object.assign(req.query, value);
    } else {
      req[property] = value;
    }

    next();
  };
};
