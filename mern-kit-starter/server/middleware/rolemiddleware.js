// roleMiddleware.js
export const ROLES = { superAdmin: 4, admin: 3, faculty: 2, student: 1 };

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ success: false, message: 'Please log in first.' });
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: `Access denied. Required: ${allowedRoles.join(' or ')}` });
        }
        next();
    };
};

export const authorizeMinRole = (minRole) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ success: false, message: 'Please log in first.' });
        if ((ROLES[req.user.role] || 0) < (ROLES[minRole] || 0)) {
            return res.status(403).json({ success: false, message: `Need at least '${minRole}' role.` });
        }
        next();
    };
};

export const isSuperAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'superAdmin') {
        return res.status(403).json({ success: false, message: 'Only Super Admin can do this.' });
    }
    next();
};