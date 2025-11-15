const jwt = require('jsonwebtoken');
const Ad = require('../models/Ad');
const Game = require('../models/Game');
const config = require('../config/app');

const adminLogin = async (req, res) => {
  const { email, password } = req.body || {};
  if (email === config.admin.email && password === config.admin.password) {
    const token = jwt.sign({ isAdmin:true, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success:true, token });
  }
  return res.status(401).json({ success:false, message:'Invalid admin' });
};

const createAd = async (req, res) => {
  try {
    const { title, mediaUrl, value, minSeconds } = req.body || {};
    const ad = await Ad.create({ title, mediaUrl, value, minSeconds });
    return res.json({ success:true, ad });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false });
  }
};

const listAds = async (req, res) => {
  const ads = await Ad.find().lean();
  res.json({ success:true, ads });
};

module.exports = { adminLogin, createAd, listAds };
