// errorMiddleware.js
export const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || err.status || 500;
    let message = err.message || 'Something went wrong on the server.';

    if (err.name === 'CastError') { statusCode = 400; message = `Invalid ID: '${err.value}'`; }
    if (err.code === 11000) { statusCode = 400; message = `${Object.keys(err.keyValue || {})[0]} already taken.`; }
    if (err.name === 'JsonWebTokenError') { statusCode = 401; message = 'Invalid token. Please log in again.'; }
    if (err.name === 'TokenExpiredError') { statusCode = 401; message = 'Session expired. Please log in again.'; }
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors || {}).map(e => e.message).join('. ') || 'Validation failed.';
    }

    const response = { success: false, message };
    if (process.env.NODE_ENV === 'development') response.stack = err.stack;

    res.status(statusCode).json(response);
};