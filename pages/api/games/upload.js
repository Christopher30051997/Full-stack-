import dbConnect from "../../../lib/mongoose";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  // In MVP we accept metadata only; file upload must be to storage (S3) in production.
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
  if (!token) return res.status(401).json({ success:false });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ success:false });
  } catch (err) { return res.status(401).json({ success:false }); }

  if (req.method !== "POST") return res.status(405).end();
  const { name, url, thumbnail } = req.body || {};
  // Store metadata (not implemented here) — create record or send email to admin
  res.json({ success:true, message:"Game metadata received (MVP). Upload files to /public/games or S3 in production." });
}
