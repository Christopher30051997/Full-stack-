import mongoose from "mongoose";

const AdSchema = new mongoose.Schema({
  title: String,
  mediaUrl: String,
  value: { type: Number, default: 100 },
  minSeconds: { type: Number, default: 5 },
  platform: { type: String, default: "adsense" },
  enabled: { type: Boolean, default: true },
  viewsCount: { type: Number, default: 0 },
  totalPaid: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Ad || mongoose.model("Ad", AdSchema);
