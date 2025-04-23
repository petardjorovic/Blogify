const express = require('express');
const router = express();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const likeController = require('../controllers/likeController');
const tagController = require('../controllers/tagController');
const authenticationValidation = require('../utils/authenticationValidation');

router.get('/', authenticationValidation.protect, postController.getAllPosts);

router.get('/tag', authenticationValidation.protect, tagController.getAllTags);

router.get('/search/:page/:limit', authenticationValidation.protect, postController.getPostsBySearch);

router.get('/:postId', authenticationValidation.protect, postController.getSinglePost);

router.get('/tag/:tagName', authenticationValidation.protect, postController.getPostsByTag);

router.get('/user/:userId', authenticationValidation.protect, postController.getPostsByUser);

router.post('/', authenticationValidation.protect, postController.addNewPost);

router.post('/like', authenticationValidation.protect, likeController.handlePostLike);

router.post('/comment', authenticationValidation.protect, commentController.addComment);

router.delete('/comment/:commentId', authenticationValidation.protect, commentController.deleteComment);

module.exports = router;
