import ApiError from '../utils/ApiError.js';

export const permit = (...roles) => (req, _res, next) => {
  if (!req.user) return next(new ApiError(401, 'Authentication required'));
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'Forbidden: insufficient role'));
  }
  next();
};
