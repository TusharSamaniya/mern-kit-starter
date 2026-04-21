// validationMiddleware.js
export const validateFeedback = (req, res, next) => {
    const errors = [];
    const { rating, remark, feedbackType, subjectId, facultyId, sectionId } = req.body;

    const validTypes = ['general', 'subject', 'faculty', 'section'];
    if (!feedbackType) errors.push('feedbackType is required.');
    else if (!validTypes.includes(feedbackType)) errors.push(`feedbackType must be: ${validTypes.join(', ')}`);

    if (rating !== undefined && rating !== null && rating !== '') {
        const n = Number(rating);
        if (isNaN(n)) errors.push('Rating must be a number.');
        else if (n < 0 || n > 5) errors.push('Rating must be between 0 and 5.');
    }

    const hasRating = rating !== undefined && rating !== null && rating !== '';
    const hasRemark = remark && remark.trim().length > 0;
    if (!hasRating && !hasRemark) errors.push('Provide a rating (0-5) or a remark.');

    if (feedbackType === 'subject' && !subjectId) errors.push('subjectId is required for subject feedback.');
    if (feedbackType === 'faculty' && !facultyId) errors.push('facultyId is required for faculty feedback.');
    if (feedbackType === 'section' && !sectionId) errors.push('sectionId is required for section feedback.');
    if (hasRemark && remark.trim().length > 1000) errors.push('Remark cannot exceed 1000 characters.');

    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Validation failed.', errors });
    next();
};

export const validateUserRegistration = (req, res, next) => {
    const errors = [];
    const { name, email, password, role } = req.body;

    if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required.');
    if (!password || password.length < 6) errors.push('Password must be at least 6 characters.');

    const validRoles = ['superAdmin', 'admin', 'student', 'faculty'];
    if (!role || !validRoles.includes(role)) errors.push(`Role must be: ${validRoles.join(', ')}`);

    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Validation failed.', errors });
    next();
};

export const validateLogin = (req, res, next) => {
    const errors = [];
    const { email, password } = req.body;
    if (!email || email.trim().length === 0) errors.push('Email is required.');
    if (!password || password.length === 0) errors.push('Password is required.');
    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Validation failed.', errors });
    next();
};

export const validateBulkOperation = (req, res, next) => {
    const errors = [];
    const { ids, action } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) errors.push("'ids' must be a non-empty array.");
    if (ids && ids.length > 100) errors.push('Cannot process more than 100 items at once.');
    const validActions = ['delete', 'export', 'archive', 'markReviewed'];
    if (!action || !validActions.includes(action)) errors.push(`action must be: ${validActions.join(', ')}`);
    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Validation failed.', errors });
    next();
};