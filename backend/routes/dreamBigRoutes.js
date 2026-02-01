const express = require('express');
const router = express.Router();
const { getEvents } = require('../controllers/dreamBigController');//C:\Users\rakes\OneDrive\Desktop\LoreZone\backend\controllers\dreamBigController.js

router.get('/dream_big', getEvents);

module.exports = router;
