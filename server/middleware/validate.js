const { body, validationResult } = require('express-validator');

// Middleware to check validation results
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }
    next();
};

// Auth validation rules
const registerRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginRules = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
];

// Post validation
const postRules = [
    body('content').trim().notEmpty().withMessage('Post content is required'),
];

// Message validation
const messageRules = [
    body('text').trim().notEmpty().withMessage('Message text is required'),
];

// Room validation
const roomRules = [
    body('title').trim().notEmpty().withMessage('Room title is required'),
    body('topic').trim().notEmpty().withMessage('Topic is required'),
];

// Job validation
const jobRules = [
    body('title').trim().notEmpty().withMessage('Job title is required'),
    body('company').trim().notEmpty().withMessage('Company name is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('type').trim().notEmpty().withMessage('Job type is required'),
];

// Profile update validation
const profileRules = [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('bio').optional().isLength({ max: 500 }).withMessage('Bio must be under 500 characters'),
];

module.exports = {
    handleValidation,
    registerRules,
    loginRules,
    postRules,
    messageRules,
    roomRules,
    jobRules,
    profileRules,
};
