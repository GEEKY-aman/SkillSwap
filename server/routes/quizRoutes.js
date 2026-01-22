const express = require('express');
const router = express.Router();
const { getQuizzes, createQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getQuizzes).post(protect, createQuiz);

module.exports = router;
