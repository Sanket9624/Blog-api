const { Comment } = require('../models');
const Validator = require('fastest-validator');

const createComment = (req, res) => {
  const { postId, text } = req.body;

  const schema = {
    postId: { type: 'number', positive: true, integer: true, optional: false },
    text: { type: 'string', max: 255, optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate({ postId, text }, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: validationResponse,
    });
  }

  Comment.create({ postId, text })
    .then((newComment) => {
      res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    })
    .catch((error) => {
      console.error('Error creating comment:', error);
      res.status(500).json({ message: 'Failed to create comment' });
    });
}

const getCommentsForPost = (req, res) => {
  const { postId } = req.params;

  const schema = {
    postId: { type: 'number', positive: true, integer: true, optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate({ postId }, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: validationResponse,
    });
  }

  Comment.findAll({ where: { postId } })
    .then((comments) => {
      res.status(200).json({ comments });
    })
    .catch((error) => {
      console.error('Error fetching comments:', error);
      res.status(500).json({ message: 'Failed to fetch comments' });
    });
}

const updateComment = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const schema = {
    text: { type: 'string', max: 255, optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate({ text }, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: validationResponse,
    });
  }

  Comment.update({ text }, { where: { id } })
    .then(([updatedCount]) => {
      if (updatedCount === 1) {
        res.status(200).json({ message: 'Comment updated successfully' });
      } else {
        res.status(404).json({ message: 'Comment not found' });
      }
    })
    .catch((error) => {
      console.error('Error updating comment:', error);
      res.status(500).json({ message: 'Failed to update comment' });
    });
}

const deleteComment = (req, res) => {
  const { id } = req.params;

  const schema = {
    id: { type: 'number', positive: true, integer: true, optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate({ id }, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: validationResponse,
    });
  }

  Comment.destroy({ where: { id } })
    .then((deletedRowCount) => {
      if (deletedRowCount === 1) {
        res.status(200).json({ message: 'Comment deleted successfully' });
      } else {
        res.status(404).json({ message: 'Comment not found' });
      }
    })
    .catch((error) => {
      console.error('Error deleting comment:', error);
      res.status(500).json({ message: 'Failed to delete comment' });
    });
}

module.exports = {
  createComment,
  getCommentsForPost,
  updateComment,
  deleteComment,
};
