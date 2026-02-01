const express = require('express');
const router = express.Router();
const { getEvents } = require('../controllers/brandController');

router.get('/brands', getEvents);

module.exports = router;
