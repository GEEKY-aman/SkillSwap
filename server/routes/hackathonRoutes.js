const express = require('express');
const router = express.Router();
const { getHackathons, getHackathonById, createHackathon, registerForHackathon, getMyHackathons } = require('../controllers/hackathonController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getHackathons);
router.get('/:id', getHackathonById);
router.post('/', createHackathon);

// Protected routes (require authentication)
router.get('/user/my-hackathons', protect, getMyHackathons);
router.post('/:id/register', protect, registerForHackathon);

module.exports = router;
