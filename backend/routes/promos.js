const express = require('express');
const router = express.Router();
const { createPromotion, listPending, updatePromo } = require('../controllers/promoController');
const { adminOnly } = require('../middleware/admin');
const { protect } = require('../middleware/auth');

router.post('/create', protect, createPromotion);
router.get('/pending', adminOnly, listPending);
router.post('/update', adminOnly, updatePromo);

module.exports = router;
