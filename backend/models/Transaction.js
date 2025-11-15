const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String,
  amount: Number,
  meta: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.models?.Transaction || mongoose.model('Transaction', TransactionSchema);
