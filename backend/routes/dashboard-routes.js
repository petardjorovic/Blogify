const express = require('express');
const router = express.Router();
const authenticationValidation = require('../utils/authenticationValidation');
const dashboardController = require('../controllers/dashboardController');
const userParser = require('../middleware/uploadUserImage');

router.get('/profile', authenticationValidation.protect, dashboardController.getDasboardUserProfile);

router.get('/home', authenticationValidation.protect, dashboardController.getDashboardHomePosts);

router.patch('/profile/image', authenticationValidation.protect, userParser.single('image'), dashboardController.updateProfileImage);

router.patch('/profile/info', authenticationValidation.protect, dashboardController.updateProfileInfo);

module.exports = router;
