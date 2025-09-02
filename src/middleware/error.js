import ApiError from '../utils/ApiError.js';

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Not Found - ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const payload = {
    success: false,
    message: err.message || 'Internal Server Error'
  };
  if (err.details) payload.details = err.details;

  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }
  res.status(statusCode).json(payload);
};
