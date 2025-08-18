const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

// Authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/verify', authController.verifyUser);
router.get('/logout', authController.logout);

// Protected route example
router.get('/protected', requireAuth, (req, res) => {
  res.json({ message: 'This is a protected route', success: true });
});

module.exports = router;