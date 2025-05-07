const express = require('express');
const router = express.Router();
const authenticationValidation = require('../utils/authenticationValidation');
const dashboardController = require('../controllers/dashboardController');

router.get('/home', authenticationValidation.protect, dashboardController.getDashboardHomePosts);

module.exports = router;
