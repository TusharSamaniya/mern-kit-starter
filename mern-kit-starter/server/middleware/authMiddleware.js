const jwt = require("jsonwebtoken");

// This is the main function that runs before any protected route
const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Step 1: Look for the token in the request headers
    // The frontend sends: Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Split "Bearer eyJhbGci..." → grab just the token part
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ If no token found, reject the request
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please log in first.",
      });
    }

    // ✅ Step 2: Verify the token is real (not fake or expired)
    // jwt.verify() decodes the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Step 3: Attach user info to the request object
    // Now any route after this can access req.user
    req.user = decoded;

    // ✅ Step 4: Move on to the next middleware or route handler
    next();
  } catch (error) {
    // If token is expired or invalid, send error
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Your session has expired. Please log in again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token. Please log in again.",
    });
  }
};

module.exports = { protect };