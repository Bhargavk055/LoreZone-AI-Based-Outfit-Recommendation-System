const express = require('express');
const router = express.Router();
const { upgradeSubscription, togglePrivacy } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// POST /api/user/upgrade - Update subscription plan
router.post('/upgrade', protect, upgradeSubscription);

// POST /api/user/privacy - Toggle privacy
router.post('/privacy', protect, togglePrivacy);

module.exports = router;
