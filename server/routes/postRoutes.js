const express = require('express');
const router = express.Router();
const { getPosts, createPost, toggleLike, addComment, deletePost } = require('../controllers/postController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const { postRules, handleValidation } = require('../middleware/validate');

router.get('/', getPosts);
router.post('/', protect, postRules, handleValidation, createPost);
router.put('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, addComment);
router.delete('/:id', protect, deletePost);

module.exports = router;
