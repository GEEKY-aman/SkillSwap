const express = require('express');
const router = express.Router();
const { getDashboard, getAdminDashboard } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getDashboard);
router.get('/admin', protect, getAdminDashboard);

module.exports = router;
