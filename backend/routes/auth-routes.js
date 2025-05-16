const express = require('express');
const router = express();
const authController = require('../controllers/authController');
const authenticationValidation = require('../middleware/authenticationValidation');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/me', authenticationValidation.protect, authController.restoreUser);

router.post('/activation/:token', authController.checkUserActivation);

module.exports = router;
