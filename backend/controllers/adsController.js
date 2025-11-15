const Ad = require('../models/Ad');
const AdView = require('../models/AdView');
const User = require('../models/User');
const { getSplit } = require('../utils/aiAds');
const { checkBasic } = require('../utils/antifraud');

const getAvailable = async (req, res) => {
  try {
    const ad = await Ad.findOne({ enabled: true }).sort({ createdAt: -1 }).lean();
    if (!ad) return res.json({ success:true, ad: { id:null, value:100, minSeconds:5, mediaUrl:'/ads/sample.mp4' } });
    return res.json({ success:true, ad });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Server error' });
  }
};

const startWatch = async (req, res) => {
  // create an AdView stub, return viewId to client
  try {
    const { adId } = req.body || {};
    const view = await AdView.create({
      adId: adId || null,
      userId: req.user ? req.user._id : null,
      ip: req.ip,
      userAgent: req.headers['user-agent'] || ''
    });
    return res.json({ success:true, viewId: view._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Server error' });
  }
};

const completeWatch = async (req, res) => {
  try {
    const { viewId, watchTime, visibilityOk } = req.body || {};
    const view = await AdView.findById(viewId);
    if (!view) return res.status(404).json({ success:false, message:'View not found' });

    const fraud = checkBasic({ watchTime, visibilityOk });
    if (!fraud.valid) {
      view.valid = false;
      await view.save();
      return res.status(400).json({ success:false, message:'Fraud detected', reason: fraud.reason });
    }

    const ad = view.adId ? await Ad.findById(view.adId) : null;
    const adValue = ad ? ad.value : 100;
    const split = getSplit(adValue);

    view.durationMs = watchTime;
    view.visibilityOk = !!visibilityOk;
    view.valid = true;
    view.earned = split.user;
    view.adminEarned = split.admin;
    await view.save();

    if (view.userId) {
      const u = await User.findById(view.userId);
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

    return res.json({ success:true, earned: split.user, adminEarned: split.admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Server error' });
  }
};

module.exports = { getAvailable, startWatch, completeWatch };
        
