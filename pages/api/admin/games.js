import dbConnect from "../../../lib/mongoose";
import jwt from "jsonwebtoken";
import Ad from "../../../models/Ad";

export default async function handler(req, res) {
  await dbConnect();
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
  if (!token) return res.status(401).json({ success:false });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ success:false });
  } catch (err) { return res.status(401).json({ success:false }); }

  if (req.method === "POST") {
    const { title, mediaUrl, value, minSeconds } = req.body || {};
    const ad = await Ad.create({ title, mediaUrl, value, minSeconds });
    return res.json({ success:true, ad });
  }
  if (req.method === "GET") {
    const ads = await Ad.find().lean();
    return res.json({ success:true, ads });
  }
  res.status(405).end();
}
