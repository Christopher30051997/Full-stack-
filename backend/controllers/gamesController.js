const Game = require('../models/Game');

const listGames = async (req, res) => {
  try {
    const games = await Game.find({ enabled: true }).lean();
    return res.json({ success:true, games });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Server error' });
  }
};

const uploadGame = async (req, res) => {
  // MVP: accept metadata only (admin upload)
  try {
    const { name, launchUrl, thumbnailUrl, uploadedBy } = req.body || {};
    if (!name || !launchUrl) return res.status(400).json({ success:false, message:'Name and URL required' });
    const g = await Game.create({ name, launchUrl, thumbnailUrl, uploadedBy: uploadedBy || null });
    return res.json({ success:true, game: g });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Server error' });
  }
};

module.exports = { listGames, uploadGame };
