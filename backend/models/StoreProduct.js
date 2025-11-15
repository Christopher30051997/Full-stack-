const mongoose = require('mongoose');

const StoreProductSchema = new mongoose.Schema({
  title: String,
  type: { type: String }, // lives | gemas | diamonds
  price: Number,
  quantity: Number,
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.models?.StoreProduct || mongoose.model('StoreProduct', StoreProductSchema);
