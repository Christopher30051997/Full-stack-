const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  title: String,
  mediaUrl: String,
  value: { type: Number, default: 100 }, // value in GemasGo units (admin revenue + user)
  minSeconds: { type: Number, default: 5 },
  platform: { type: String, default: 'adsense' },
  enabled: { type: Boolean, default: true },
  viewsCount: { type: Number, default: 0 },
  totalPaid: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.models?.Ad || mongoose.model('Ad', AdSchema);
