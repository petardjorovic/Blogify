const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const authenticationValidation = require('../middleware/authenticationValidation');

router.get('/', authenticationValidation.protect, memberController.getAllMembers);

router.get('/:userId', authenticationValidation.protect, memberController.getMemberInfo);

router.delete('/:userId', authenticationValidation.protect, memberController.deleteMember);

module.exports = router;
