const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const db = require('../config/db');

const register = async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !password) return res.status(400).json({ success:false, message:'Name and password required' });

  try {
    const existing = email ? await User.findOne({ email }) : null;
    if (existing) return res.status(400).json({ success:false, message:'Email already used' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash, gemasGo: 100, lives: 10 });
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.status(201).json({ success:true, token, user: { id: user._id, name: user.name, gemasGo: user.gemasGo } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ success:false, message:'Email and password required' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success:false, message:'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash || '');
    if (!ok) return res.status(401).json({ success:false, message:'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success:true, token, user: { id: user._id, name: user.name, gemasGo: user.gemasGo } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Server error' });
  }
};

const me = async (req, res) => {
  if (!req.user) return res.status(401).json({ success:false });
  res.json({ success:true, user: req.user });
};

module.exports = { register, login, me };
  
