const express = require('express');
const router = express();
const authController = require('../controllers/authController');
const authenticationValidation = require('../utils/authenticationValidation');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/me', authenticationValidation.protect, authController.restoreUser);

module.exports = router;
