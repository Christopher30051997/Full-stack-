import dbConnect from "../../../lib/mongoose";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success:false, message:"Method not allowed" });
  const { name, email, password } = req.body || {};
  if (!name || !password) return res.status(400).json({ success:false, message:"Name and password required" });
  await dbConnect();
  try {
    if (email) {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ success:false, message:"Email already in use" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash, gemasGo: 100, lives: 10 });
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ success:true, token, user: { id: user._id, name: user.name, gemasGo: user.gemasGo } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:"Server error" });
  }
}
