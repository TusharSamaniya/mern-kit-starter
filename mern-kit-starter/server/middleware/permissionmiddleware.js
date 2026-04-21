// permissionMiddleware.js
export const PERMISSIONS = {
    CAN_EDIT: 'can_edit',
    CAN_VIEW: 'can_view',
    CAN_EDIT_SPECIFIC: 'can_edit_specific',
};

export const checkPermission = (requiredPermission) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ success: false, message: 'Please log in first.' });
        if (req.user.role === 'superAdmin') return next();
        if (!(req.user.permissions || []).includes(requiredPermission)) {
            return res.status(403).json({ success: false, message: `You need '${requiredPermission}' permission.` });
        }
        next();
    };
};

export const checkEditSpecific = (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Please log in first.' });
    if (req.user.role === 'superAdmin') { req.canEditAll = true; return next(); }
    const perms = req.user.permissions || [];
    if (perms.includes(PERMISSIONS.CAN_EDIT)) { req.canEditAll = true; return next(); }
    if (perms.includes(PERMISSIONS.CAN_EDIT_SPECIFIC)) {
        req.canEditAll = false;
        req.editScope = { userId: req.user.id, section: req.user.section };
        return next();
    }
    return res.status(403).json({ success: false, message: 'You do not have edit permissions.' });
};

export const canView = checkPermission(PERMISSIONS.CAN_VIEW);
export const canEdit = checkPermission(PERMISSIONS.CAN_EDIT);