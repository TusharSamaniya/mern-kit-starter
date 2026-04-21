// ============================================================
// error.middleware.js
// 🚨 SOMETHING WENT WRONG - Global Error Handler
// ============================================================
// This is the LAST middleware in the chain.
// When anything goes wrong anywhere in the app, Express
// automatically sends the error to this function.
//
// It must have exactly 4 parameters: (err, req, res, next)
// The "err" at the beginning tells Express this is an error handler.
//
// Think of this like a hospital emergency room — all accidents
// from the whole building come here to be treated properly.
// ============================================================

// -------------------------------------------------------
// notFound
// Runs when a user hits a route that doesn't exist
// Example: GET /api/v1/banana → this runs because no such route
// -------------------------------------------------------
const notFound = (req, res, next) => {
  const error = new Error(
    `Route not found: ${req.method} ${req.originalUrl}`
  );
  error.statusCode = 404;
  next(error); // Pass to the errorHandler below
};

// -------------------------------------------------------
// errorHandler
// The main error catcher — handles ALL errors in the app
// Must be registered LAST in your Express app
// -------------------------------------------------------
const errorHandler = (err, req, res, next) => {
  // Default to 500 (Internal Server Error) if no code is set
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Something went wrong on the server.";

  // -----------------------------------------------
  // Handle specific known error types
  // -----------------------------------------------

  // MongoDB: ID format is invalid (e.g., "abc" instead of proper ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ID format: '${err.value}'. Please provide a valid ID.`;
  }

  // MongoDB: Duplicate value (e.g., email already registered)
  if (err.code === 11000) {
    statusCode = 400;
    const duplicateField = Object.keys(err.keyValue || {})[0];
    message = `This ${duplicateField} is already taken. Please use a different one.`;
  }

  // JWT: Token is invalid
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid authentication token. Please log in again.";
  }

  // JWT: Token has expired
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your session has expired. Please log in again.";
  }

  // MongoDB: Validation error (e.g., required field missing)
  if (err.name === "ValidationError") {
    statusCode = 400;
    // Extract all validation messages and join them
    const validationErrors = Object.values(err.errors || {}).map(
      (e) => e.message
    );
    message = validationErrors.length > 0
      ? validationErrors.join(". ")
      : "Validation failed. Please check your input.";
  }

  // -----------------------------------------------
  // Build the response object
  // -----------------------------------------------
  const response = {
    success: false,
    message: message,
  };

  // In development mode, show the full error stack (for debugging)
  // In production, don't show technical details to users
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
    response.error = err;
  }

  // Send the error response
  res.status(statusCode).json(response);
};

module.exports = { notFound, errorHandler };