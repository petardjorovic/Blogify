const express = require('express');
const router = express();
const postController = require('../controllers/postController');
const authenticationValidation = require('../utils/authenticationValidation');

router.get('/', authenticationValidation.protect, postController.getAllPosts);

router.get('/:postId', authenticationValidation.protect, postController.getSinglePost);

router.get('/tag/:tagName', authenticationValidation.protect, postController.getPostsByTag);

module.exports = router;
