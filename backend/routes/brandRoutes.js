const express = require('express');
const router = express.Router();
const { getBrands } = require('../controllers/brandController');

router.get('/brands', getBrands);

module.exports = router;
