const express = require('express');
const router = express.Router();
const { adminLogin, createAd, listAds } = require('../controllers/adminController');

router.post('/login', adminLogin);
router.post('/ad', createAd);
router.get('/ads', listAds);

module.exports = router;
