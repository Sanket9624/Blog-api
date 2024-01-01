const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment.controller');

// Route to create a new comment
router.post('/comments', commentController.createComment);

// Route to get comments for a specific post
router.get('/comments/post/:postId', commentController.getCommentsForPost);

// Route to update a comment by ID
router.put('/comments/:id', commentController.updateComment);

// Route to delete a comment by ID
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
