const express = require('express');
const router = express();
const postController = require('../controllers/postController');
const authenticationValidation = require('../utils/authenticationValidation');

router.get('/', authenticationValidation.protect, postController.getAllPosts);

module.exports = router;
