const express = require('express');
const router = express.Router();
const { listGames, uploadGame } = require('../controllers/gamesController');
const { adminOnly } = require('../middleware/admin');

router.get('/list', listGames);
router.post('/upload', adminOnly, uploadGame);

module.exports = router;
