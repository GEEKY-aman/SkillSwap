const express = require('express');
const router = express.Router();
const { getJobs, getJobById, createJob, applyToJob, getMyApplications } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', createJob);

// Protected routes (require authentication)
router.get('/user/my-applications', protect, getMyApplications);
router.post('/:id/apply', protect, applyToJob);

module.exports = router;
