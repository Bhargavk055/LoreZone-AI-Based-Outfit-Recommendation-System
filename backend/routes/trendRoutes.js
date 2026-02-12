const express = require('express');
const { getTrends, createTrend } = require('../controllers/trendController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// GET /api/trend/trends - Fetch all trends
router.get('/trends', getTrends);

// POST /api/trend/trends - Upload a new trend (Protected)
router.post('/trends', protect, upload.single('image'), createTrend);

module.exports = router;
