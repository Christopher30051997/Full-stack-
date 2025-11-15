import mongoose from "mongoose";
const StoreProductSchema = new mongoose.Schema({
  title: String,
  type: String, // lives | gemas | diamonds
  price: Number,
  quantity: Number,
  enabled: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.models.StoreProduct || mongoose.model("StoreProduct", StoreProductSchema);
