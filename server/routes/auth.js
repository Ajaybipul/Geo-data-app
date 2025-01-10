const express = require('express');
const { registerUser, loginUser, verifyToken } = require('../controllers/authController');

const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// Verify Token Route
router.get('/verify', verifyToken);

module.exports = router;
