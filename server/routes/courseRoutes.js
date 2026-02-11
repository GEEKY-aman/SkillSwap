const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, enrollInCourse, getMyCourses } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);

// Protected routes (require authentication)
router.get('/user/my-courses', protect, getMyCourses);
router.post('/:id/enroll', protect, enrollInCourse);

module.exports = router;
