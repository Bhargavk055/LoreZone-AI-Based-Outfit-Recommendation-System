const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/commentController');

// POST /api/comments/add
router.post('/add', addComment);

// GET /api/comments/:postId
router.get('/:postId', getComments);

module.exports = router;
