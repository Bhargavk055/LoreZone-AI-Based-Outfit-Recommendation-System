const express = require('express');
const { getTrends } = require('../controllers/trendController');

const router = express.Router();

// GET /api/trends - Fetch all trends
router.get('/trends', getTrends);

module.exports = router;
