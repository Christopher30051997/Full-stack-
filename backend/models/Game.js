const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: String,
  thumbnailUrl: String,
  launchUrl: String,
  enabled: { type: Boolean, default: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.models?.Game || mongoose.model('Game', GameSchema);
