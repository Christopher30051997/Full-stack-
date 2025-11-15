import dbConnect from "../../../lib/mongoose";
import Ad from "../../../models/Ad";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();
  try {
    const ad = await Ad.findOne({ enabled: true }).sort({ createdAt: -1 }).lean();
    if (!ad) {
      return res.json({ success:true, ad: { id:null, value:100, minSeconds:5, mediaUrl: "/ads/sample.mp4" } });
    }
    res.json({ success:true, ad });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:"Server error" });
  }
}
