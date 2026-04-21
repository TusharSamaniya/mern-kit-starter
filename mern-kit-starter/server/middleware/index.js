// middleware/index.js

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

// ✅ FIXED: was 'validationMiddleware.js' but your file is named 'validateMiddleware.js'
export {
    validateFeedback,
    validateUserRegistration,
    validateLogin,
    validateBulkOperation,
} from './validateMiddleware.js';

export { notFound, errorHandler } from './errorMiddleware.js';