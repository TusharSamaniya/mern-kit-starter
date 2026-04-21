// ============================================================
// middleware/index.js
// 📦 Central export — import all middleware from here
// ============================================================
// Uses ES Module syntax (export/import) to match the rest
// of the project which uses "import" not "require"
// ============================================================

export { protect } from './authMiddleware.js';

export {
    authorizeRoles,
    authorizeMinRole,
    isSuperAdmin,
    ROLES,
} from './roleMiddleware.js';

export {
    checkPermission,
    checkEditSpecific,
    canView,
    canEdit,
    PERMISSIONS,
} from './permissionMiddleware.js';

export {
    validateFeedback,
    validateUserRegistration,
    validateLogin,
    validateBulkOperation,
} from './validationMiddleware.js';

export { notFound, errorHandler } from './errorMiddleware.js';