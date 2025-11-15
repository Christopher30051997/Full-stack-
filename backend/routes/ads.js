const express = require('express');
const router = express.Router();
const { getAvailable, startWatch, completeWatch } = require('../controllers/adsController');
const { protect } = require('../middleware/auth');

router.get('/available', getAvailable);
router.post('/start', protect, startWatch);    // create view
router.post('/complete', protect, completeWatch);

module.exports = router;
