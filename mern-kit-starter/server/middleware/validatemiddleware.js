// ============================================================
// validate.middleware.js
// ✅ IS YOUR DATA CORRECT? - Validates incoming request data
// ============================================================
// Before saving anything to the database, we need to make sure
// the data makes sense. For example:
//   - Rating must be between 0 and 5 (from the notes)
//   - A feedback form can't be submitted empty
//   - Role must be one of the valid roles
//
// Think of this like a form checker — if you leave a required
// field empty on a website, it tells you "This field is required".
// ============================================================

// -------------------------------------------------------
// validateFeedback
// Checks incoming feedback data before saving to DB
// -------------------------------------------------------
const validateFeedback = (req, res, next) => {
  const errors = [];
  const { rating, remark, feedbackType, subjectId, facultyId, sectionId } =
    req.body;

  // ✅ Rule 1: feedbackType must be provided
  // From notes: "general" (open for all) OR "subject/faculty/section wise"
  const validTypes = ["general", "subject", "faculty", "section"];
  if (!feedbackType) {
    errors.push("feedbackType is required (general, subject, faculty, section).");
  } else if (!validTypes.includes(feedbackType)) {
    errors.push(
      `feedbackType must be one of: ${validTypes.join(", ")}. Got: '${feedbackType}'`
    );
  }

  // ✅ Rule 2: Rating validation (from notes: 0 to 5 rating based)
  // Rating is optional if a remark is provided, but if given must be 0-5
  if (rating !== undefined && rating !== null && rating !== "") {
    const ratingNum = Number(rating);
    if (isNaN(ratingNum)) {
      errors.push("Rating must be a number.");
    } else if (ratingNum < 0 || ratingNum > 5) {
      errors.push(`Rating must be between 0 and 5. Got: ${rating}`);
    }
  }

  // ✅ Rule 3: At least one of rating or remark must be provided
  // From notes: "0 to 5 rating based question OR remark"
  const hasRating = rating !== undefined && rating !== null && rating !== "";
  const hasRemark = remark && remark.trim().length > 0;

  if (!hasRating && !hasRemark) {
    errors.push(
      "Please provide either a rating (0-5) or a remark (or both)."
    );
  }

  // ✅ Rule 4: If feedback is NOT general, require the specific ID
  if (feedbackType === "subject" && !subjectId) {
    errors.push("subjectId is required for subject-wise feedback.");
  }
  if (feedbackType === "faculty" && !facultyId) {
    errors.push("facultyId is required for faculty-wise feedback.");
  }
  if (feedbackType === "section" && !sectionId) {
    errors.push("sectionId is required for section-wise feedback.");
  }

  // ✅ Rule 5: Remark should not be too long
  if (hasRemark && remark.trim().length > 1000) {
    errors.push("Remark cannot exceed 1000 characters.");
  }

  // If there are any errors, stop and send them back
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed. Please fix the errors below.",
      errors: errors,
    });
  }

  // ✅ All good — move to next middleware/route
  next();
};

// -------------------------------------------------------
// validateUserRegistration
// Checks data when creating a new user (admin creates users)
// -------------------------------------------------------
const validateUserRegistration = (req, res, next) => {
  const errors = [];
  const { name, email, password, role } = req.body;

  // Name is required
  if (!name || name.trim().length === 0) {
    errors.push("Name is required.");
  } else if (name.trim().length < 2) {
    errors.push("Name must be at least 2 characters.");
  }

  // Email is required and must look like an email
  if (!email || email.trim().length === 0) {
    errors.push("Email is required.");
  } else {
    // Simple email check using regex (a@b.c format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please provide a valid email address.");
    }
  }

  // Password is required and must be strong enough
  if (!password || password.length === 0) {
    errors.push("Password is required.");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }

  // Role must be valid
  const validRoles = ["superAdmin", "admin", "student", "faculty"];
  if (!role) {
    errors.push("Role is required.");
  } else if (!validRoles.includes(role)) {
    errors.push(
      `Role must be one of: ${validRoles.join(", ")}. Got: '${role}'`
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errors,
    });
  }

  next();
};

// -------------------------------------------------------
// validateLogin
// Checks data when a user tries to log in
// -------------------------------------------------------
const validateLogin = (req, res, next) => {
  const errors = [];
  const { email, password } = req.body;

  if (!email || email.trim().length === 0) {
    errors.push("Email is required.");
  }

  if (!password || password.length === 0) {
    errors.push("Password is required.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errors,
    });
  }

  next();
};

// -------------------------------------------------------
// validateBulkOperation
// From notes: "bulk" - validates bulk feedback actions
// -------------------------------------------------------
const validateBulkOperation = (req, res, next) => {
  const errors = [];
  const { ids, action } = req.body;

  // IDs must be an array with at least one item
  if (!ids || !Array.isArray(ids)) {
    errors.push("'ids' must be an array of feedback IDs.");
  } else if (ids.length === 0) {
    errors.push("'ids' array cannot be empty. Provide at least one ID.");
  } else if (ids.length > 100) {
    errors.push("Cannot process more than 100 items at once.");
  }

  // Action must be specified
  const validActions = ["delete", "export", "archive", "markReviewed"];
  if (!action) {
    errors.push(`'action' is required. Valid actions: ${validActions.join(", ")}`);
  } else if (!validActions.includes(action)) {
    errors.push(
      `Invalid action '${action}'. Valid actions: ${validActions.join(", ")}`
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Bulk operation validation failed.",
      errors: errors,
    });
  }

  next();
};

module.exports = {
  validateFeedback,
  validateUserRegistration,
  validateLogin,
  validateBulkOperation,
};