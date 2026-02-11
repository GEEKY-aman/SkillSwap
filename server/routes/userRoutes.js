const express = require('express');
const router = express.Router();
const { getUsers, getMentors, getMatches, updateUserRole, updateUserStatus, purchaseItem } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getUsers);
router.get('/mentors', getMentors);
router.get('/matches', protect, getMatches);
router.put('/:id/role', protect, updateUserRole);
router.put('/:id/status', protect, updateUserStatus);
router.post('/purchase', protect, purchaseItem);

module.exports = router;
