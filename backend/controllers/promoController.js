const Promotion = require('../models/Promotion');

const createPromotion = async (req, res) => {
  try {
    const { userId, platform, url, durationDays, targetLikes, targetViews } = req.body || {};
    // cost calculation will be done by admin AI later; for now store
    const costGemas = 100; // placeholder
    const promo = await Promotion.create({ userId, platform, url, durationDays, targetLikes, targetViews, costGemas, status:'PENDING' });
    return res.json({ success:true, promo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Server error' });
  }
};

const listPending = async (req, res) => {
  try {
    const promos = await Promotion.find({ status: 'PENDING' }).populate('userId','name email').lean();
    return res.json({ success:true, promos });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Server error' });
  }
};

const updatePromo = async (req, res) => {
  try {
    const { id, action } = req.body || {};
    const promo = await Promotion.findById(id);
    if (!promo) return res.status(404).json({ success:false, message:'Not found' });
    if (action === 'approve') promo.status = 'APPROVED';
    else if (action === 'reject') promo.status = 'REJECTED';
    await promo.save();
    return res.json({ success:true, promo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Server error' });
  }
};

module.exports = { createPromotion, listPending, updatePromo };
