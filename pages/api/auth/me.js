import dbConnect from "../../../lib/mongoose";
import jwt from "jsonwebtoken";
import User from "../../../models/User";

export default async function handler(req, res) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
  if (!token) return res.status(401).json({ success:false, message:"Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await dbConnect();
    const user = await User.findById(decoded.userId).select("-passwordHash");
    if (!user) return res.status(404).json({ success:false, message:"User not found" });
    res.json({ success:true, user });
  } catch (err) {
    res.status(401).json({ success:false, message:"Invalid token" });
  }
}
