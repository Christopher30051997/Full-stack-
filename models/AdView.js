import mongoose from "mongoose";

const AdViewSchema = new mongoose.Schema({
  adId: { type: mongoose.Schema.Types.ObjectId, ref: "Ad", default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  ip: String,
  userAgent: String,
  durationMs: Number,
  visibilityOk: Boolean,
  valid: { type: Boolean, default: false },
  earned: { type: Number, default: 0 },
  adminEarned: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.AdView || mongoose.model("AdView", AdViewSchema);
