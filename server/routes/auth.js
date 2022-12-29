const express = require('express');

const { signup, login, reinit } = require('../controllers/auth.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/reinit', reinit)

module.exports = router;