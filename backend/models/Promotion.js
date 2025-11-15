const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  platform: String,
  url: String,
  durationDays: Number,
  targetLikes: Number,
  targetViews: Number,
  costGemas: Number,
  status: { type: String, default: 'PENDING' } // PENDING APPROVED REJECTED
}, { timestamps: true });

module.exports = mongoose.models?.Promotion || mongoose.model('Promotion', PromotionSchema);
