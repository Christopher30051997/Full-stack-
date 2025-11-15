const jwt = require('jsonwebtoken');

const adminOnly = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
  if (!token) return res.status(401).json({ success:false, message:'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ success:false, message:'Admin only' });
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success:false, message:'Invalid token' });
  }
};

module.exports = { adminOnly };
