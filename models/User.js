import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, sparse: true, unique: true, index: true },
  passwordHash: { type: String },
  gemasGo: { type: Number, default: 0 },
  lives: { type: Number, default: 10 },
  adsWatched: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  freeFireId: { type: String, default: null }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
