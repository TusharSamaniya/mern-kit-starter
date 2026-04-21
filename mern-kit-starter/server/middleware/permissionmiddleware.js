// ============================================================
// permission.middleware.js
// 🔑 WHAT CAN YOU DO? - Checks specific permissions
// ============================================================
// From the notes, there are 3 permissions:
//   - can edit          → full edit access
//   - can view          → read-only access
//   - can edit specific → can only edit certain items (e.g., their section)
//
// Think of this like keys in a hotel:
//   - Master key = can edit (open any room)
//   - Guest key  = can view (only your own room)
//   - Staff key  = can edit specific (only certain floors)
//
// NOTE: This middleware works AFTER auth.middleware.js
// because it reads req.user which is set by auth.
// ============================================================

// List of valid permissions in our system
const PERMISSIONS = {
  CAN_EDIT: "can_edit",
  CAN_VIEW: "can_view",
  CAN_EDIT_SPECIFIC: "can_edit_specific",
};

// -------------------------------------------------------
// checkPermission(requiredPermission)
// Usage: checkPermission("can_edit")
//
// Checks if the logged-in user has a specific permission.
// The user's permissions are stored in their JWT token.
// -------------------------------------------------------
const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please log in first.",
      });
    }

    // superAdmin always has all permissions - no checks needed
    if (req.user.role === "superAdmin") {
      return next();
    }

    // Get the user's permissions array from their token
    // Example: permissions: ["can_view", "can_edit_specific"]
    const userPermissions = req.user.permissions || [];

    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. You need '${requiredPermission}' permission.`,
      });
    }

    // ✅ Permission found, move forward
    next();
  };
};

// -------------------------------------------------------
// checkEditSpecific
// Usage: directly as middleware on routes like PUT /feedback/:id
//
// Special middleware for "can edit specific" permission.
// A user with this permission can only edit items that BELONG TO THEM
// (e.g., feedback for their own section/subject/faculty).
//
// This adds a flag to req so the controller can do a further check.
// -------------------------------------------------------
const checkEditSpecific = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Please log in first.",
    });
  }

  // superAdmin bypasses this check
  if (req.user.role === "superAdmin") {
    req.canEditAll = true;
    return next();
  }

  const userPermissions = req.user.permissions || [];

  // Full edit = can edit everything
  if (userPermissions.includes(PERMISSIONS.CAN_EDIT)) {
    req.canEditAll = true;
    return next();
  }

  // Edit specific = can only edit their own section/subject
  if (userPermissions.includes(PERMISSIONS.CAN_EDIT_SPECIFIC)) {
    req.canEditAll = false; // Controller will check ownership
    req.editScope = {
      userId: req.user.id,
      section: req.user.section,
      subject: req.user.subject,
      faculty: req.user.faculty,
    };
    return next();
  }

  // View only = cannot edit at all
  return res.status(403).json({
    success: false,
    message: "Access denied. You do not have edit permissions.",
  });
};

// -------------------------------------------------------
// canView
// Simple shortcut: user must have at least view permission
// -------------------------------------------------------
const canView = checkPermission(PERMISSIONS.CAN_VIEW);

// -------------------------------------------------------
// canEdit
// Simple shortcut: user must have full edit permission
// -------------------------------------------------------
const canEdit = checkPermission(PERMISSIONS.CAN_EDIT);

module.exports = {
  checkPermission,
  checkEditSpecific,
  canView,
  canEdit,
  PERMISSIONS,
};