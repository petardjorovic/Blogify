const express = require('express');
const router = express();
const authController = require('../controllers/authController');
const authenticationValidation = require('../middleware/authenticationValidation');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/me', authenticationValidation.protect, authController.restoreUser);

router.post('/activation/:token', authController.checkUserActivation);

router.patch('/changePassword', authenticationValidation.protect, authController.changePassword);

router.post('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);

router.post('/resendActivation', authController.checkResendActivationLink);

module.exports = router;
