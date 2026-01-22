const express = require('express');
const router = express.Router();
const { getHackathons, createHackathon } = require('../controllers/hackathonController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getHackathons).post(protect, createHackathon);

module.exports = router;
