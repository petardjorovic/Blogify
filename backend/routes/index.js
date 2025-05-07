const express = require('express');
const router = express.Router();

router.use('/api/auth', require('./auth-routes'));

router.use('/api/post', require('./post-routes'));

router.use('/api/member', require('./member-routes'));

router.use('/api/dashboard', require('./dashboard-routes'));

module.exports = router;
