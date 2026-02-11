const express = require('express');
const router = express.Router();
const { getRooms, createRoom, joinRoom, leaveRoom } = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');
const { roomRules, handleValidation } = require('../middleware/validate');

router.get('/', getRooms);
router.post('/', protect, roomRules, handleValidation, createRoom);
router.put('/:id/join', protect, joinRoom);
router.put('/:id/leave', protect, leaveRoom);

module.exports = router;
