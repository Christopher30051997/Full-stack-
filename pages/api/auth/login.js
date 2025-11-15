import dbConnect from "../../../lib/mongoose";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success:false });
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ success:false, message:"Email and password required" });
  await dbConnect();
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success:false, message:"Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash || "");
    if (!ok) return res.status(401).json({ success:false, message:"Invalid credentials" });
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success:true, token, user: { id: user._id, name: user.name, gemasGo: user.gemasGo } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:"Server error" });
  }
}
