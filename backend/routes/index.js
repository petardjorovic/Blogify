const express = require('express');
const router = express.Router();

router.use('/api/auth', require('./auth-routes'));

router.use('/api/post', require('./post-routes'));

module.exports = router;
