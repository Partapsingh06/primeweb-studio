import { errorResponse } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log in non-test environments
  if (process.env.NODE_ENV !== 'test') {
    console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id: ${err.value}`;
    return errorResponse(res, message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const message = `An account or record with that ${field} already exists.`;
    return errorResponse(res, message, 409);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return errorResponse(res, 'Validation error', 422, messages);
  }

  // Multer file upload errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return errorResponse(res, 'File size too large. Maximum size is 5MB.', 400);
    }
    return errorResponse(res, `Upload error: ${err.message}`, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid security token.', 401);
  }

  const statusCode = err.statusCode || 500;
  const message = (process.env.NODE_ENV === 'production' && statusCode === 500)
    ? 'Internal server error. Please try again later.'
    : (err.message || 'Server Error');

  return errorResponse(res, message, statusCode);
};

export const notFoundHandler = (req, res, next) => {
  return errorResponse(res, `Route not found: ${req.originalUrl}`, 404);
};
