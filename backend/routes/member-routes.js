const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const authenticationValidation = require('../utils/authenticationValidation');

router.get('/', authenticationValidation.protect, memberController.getAllMembers);

router.get('/:userId', authenticationValidation.protect, memberController.getMemberInfo);

module.exports = router;
