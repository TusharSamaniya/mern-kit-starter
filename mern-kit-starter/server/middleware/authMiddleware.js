// authMiddleware.js
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Please log in first.',
            });
        }

        // Reads JWT_SECRET from your .env file
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
        }
        return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
    }
};

// ✅ Alias — your existing routes/userRoutes.js imports this name,
// so we export the same function under both names.
// This way your routes file works WITHOUT any changes.
export const authenticatedMiddleware = protect;