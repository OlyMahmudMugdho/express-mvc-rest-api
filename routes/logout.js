const express = require('express');
const router = express.Router();
const LogOutController = require('../controllers/LogOutController');

router.route('/')
    .get(LogOutController.handleLogOut);

module.exports = router;