const express = require('express');
const router = express.Router();
const { getConversations, getMessages, sendMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
const { messageRules, handleValidation } = require('../middleware/validate');

router.get('/conversations', protect, getConversations);
router.get('/:userId', protect, getMessages);
router.post('/:userId', protect, messageRules, handleValidation, sendMessage);

module.exports = router;
