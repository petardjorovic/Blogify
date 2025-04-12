const express = require('express');
const router = express();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const authenticationValidation = require('../utils/authenticationValidation');

router.get('/', authenticationValidation.protect, postController.getAllPosts);

router.get('/search', authenticationValidation.protect, postController.getPostsBySearch);

router.get('/:postId', authenticationValidation.protect, postController.getSinglePost);

router.get('/tag/:tagName', authenticationValidation.protect, postController.getPostsByTag);

router.get('/user/:userId', authenticationValidation.protect, postController.getPostsByUser);

router.post('/comment', authenticationValidation.protect, commentController.addComment);

module.exports = router;
