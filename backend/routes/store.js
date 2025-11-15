const express = require('express');
const router = express.Router();
const { listProducts, purchase } = require('../controllers/storeController');
const { protect } = require('../middleware/auth');

router.get('/products', listProducts);
router.post('/purchase', protect, purchase);

module.exports = router;
