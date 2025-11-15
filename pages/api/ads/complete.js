import dbConnect from "../../../lib/mongoose";
import Ad from "../../../models/Ad";
import AdView from "../../../models/AdView";
import User from "../../../models/User";
import { calculateAdSplit } from "../../../utils/aiAds";
import { checkFraud } from "../../../utils/antifraud";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { adId, userId, watchTime, visibilityOk } = req.body || {};
  await dbConnect();
  try {
    const ad = adId ? await Ad.findById(adId) : null;
    const adValue = ad ? ad.value : 100;
    const fraud = checkFraud({ userId, watchTime, visibilityOk });
    if (!fraud.valid) return res.status(400).json({ success:false, message:"Fraud detected", reason: fraud.reason });
    const split = calculateAdSplit(adValue);
    const view = await AdView.create({
      adId: ad ? ad._id : null,
      userId: userId || null,
      durationMs: watchTime,
      visibilityOk: !!visibilityOk,
      valid: true,
      earned: split.user,
      adminEarned: split.admin
    });
    if (userId) {
      const u = await User.findById(userId);
      if (u) {
        u.gemasGo += split.user;
        u.adsWatched = (u.adsWatched || 0) + 1;
        await u.save();
      }
    }
    if (ad) {
      ad.viewsCount = (ad.viewsCount || 0) + 1;
      ad.totalPaid = (ad.totalPaid || 0) + split.admin;
      await ad.save();
    }
    res.json({ success:true, earned: split.user, adminEarned: split.admin, viewId: view._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:"Server error" });
  }
}
