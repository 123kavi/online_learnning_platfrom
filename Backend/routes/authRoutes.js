const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');

// Register a new user
router.post('/register', register);

// Login an existing user
router.post('/login', login);

// Login an existing user
router.post('/logout', logout);

module.exports = router;
