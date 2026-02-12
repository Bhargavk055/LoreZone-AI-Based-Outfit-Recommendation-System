const express = require('express');
const router = express.Router();
const { getSmartRecommendations, getStylistChat } = require('../controllers/aiController');

// POST /api/ai/recommend
router.post('/recommend', getSmartRecommendations);

// POST /api/ai/chat
router.post('/chat', getStylistChat);

module.exports = router;
