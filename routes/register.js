const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');

router.route('/')
    .post(RegisterController.handleRegister)

module.exports = router;