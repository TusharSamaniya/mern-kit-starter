const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token;

    // Look for the token in the Authorization header
    // Frontend sends:  Authorization: Bearer eyJhbGci...
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token = not logged in
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please log in first.",
      });
    }

    // ✅ Verify the token using JWT_SECRET from your .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request
    // (role, id, permissions etc. will be available as req.user)
    req.user = decoded;

    next();
  } catch (error) {
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