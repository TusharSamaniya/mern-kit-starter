// ============================================================
// role.middleware.js
// 👥 WHO ARE YOU ALLOWED TO BE? - Checks user roles
// ============================================================
// From the notes, there are 4 roles:
//   - superAdmin (1 person)  → can do everything
//   - admin      (up to 10)  → manages feedback system
//   - student               → gives feedback
//   - faculty               → receives feedback / views reports
//
// Think of roles like job titles in a company.
// A manager can do more than an intern.
// ============================================================

// Role hierarchy - higher number = more power
const ROLES = {
  superAdmin: 4,
  admin: 3,
  faculty: 2,
  student: 1,
};

// -------------------------------------------------------
// authorizeRoles(...allowedRoles)
// Usage: authorizeRoles("admin", "superAdmin")
//
// This creates a middleware that only lets certain roles pass.
// Example: Only admin and superAdmin can download reports.
// -------------------------------------------------------
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is set by auth.middleware.js (protect function)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please log in first.",
      });
    }

    const userRole = req.user.role;

    // Check if user's role is in the allowed list
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Your role '${userRole}' cannot perform this action. Required: ${allowedRoles.join(" or ")}`,
      });
    }

    // ✅ Role is allowed, move forward
    next();
  };
};

// -------------------------------------------------------
// authorizeMinRole(minRole)
// Usage: authorizeMinRole("admin")
//
// This lets users with EQUAL OR HIGHER role pass.
// Example: If minRole is "admin", both admin and superAdmin pass.
// -------------------------------------------------------
const authorizeMinRole = (minRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please log in first.",
      });
    }

    const userRoleLevel = ROLES[req.user.role] || 0;
    const requiredLevel = ROLES[minRole] || 0;

    if (userRoleLevel < requiredLevel) {
      return res.status(403).json({
        success: false,
        message: `Access denied. You need at least '${minRole}' role.`,
      });
    }

    next();
  };
};

// -------------------------------------------------------
// isSuperAdmin
// Usage: directly as middleware
//
// Quick check: only allows the single super admin.
// -------------------------------------------------------
const isSuperAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "superAdmin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Only Super Admin can perform this action.",
    });
  }
  next();
};

module.exports = { authorizeRoles, authorizeMinRole, isSuperAdmin, ROLES };