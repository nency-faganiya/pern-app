const express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts-controller');

router.get('/', postsController.getPosts);

router.get('/every', postsController.getEvery);

router.post('/', postsController.createPost);

router.patch('/:id', postsController.updatePost);

router.delete('/:id', postsController.deletePost);

router.patch('/:id/likePost', postsController.likePost);

module.exports = router;