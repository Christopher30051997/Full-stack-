import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String,
  amount: Number,
  meta: mongoose.Schema.Types.Mixed
}, { timestamps: true });
export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
