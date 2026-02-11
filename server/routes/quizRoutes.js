const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, createQuiz, submitQuizAttempt, getMyAttempts } = require('../controllers/quizController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.post('/', createQuiz);

// Protected routes (require authentication)
router.get('/user/my-attempts', protect, getMyAttempts);

// Submit quiz - works for both authenticated and unauthenticated users
router.post('/:id/submit', optionalAuth, submitQuizAttempt);

module.exports = router;
