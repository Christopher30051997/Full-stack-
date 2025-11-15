import dbConnect from "../../../lib/mongoose";
import Promotion from "../../../models/Promotion";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
    if (!token) return res.status(401).json({ success:false });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded.isAdmin) return res.status(403).json({ success:false });
    } catch (err) { return res.status(401).json({ success:false }); }
    const promos = await Promotion.find({ status: "PENDING" }).populate("userId","name email").lean();
    return res.json({ success:true, promotions: promos });
  }
  if (req.method === "POST") {
    // approve/reject
    const { id, action } = req.body || {};
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
    if (!token) return res.status(401).json({ success:false });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded.isAdmin) return res.status(403).json({ success:false });
    } catch (err) { return res.status(401).json({ success:false }); }
    const promo = await Promotion.findById(id);
    if (!promo) return res.status(404).json({ success:false, message:"Promo not found" });
    if (action === "approve") promo.status = "APPROVED";
    else if (action === "reject") promo.status = "REJECTED";
    await promo.save();
    return res.json({ success:true, promo });
  }
  res.status(405).end();
}
