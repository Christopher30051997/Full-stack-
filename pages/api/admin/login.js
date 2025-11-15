import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return res.status(500).json({ success:false, message:"Admin not configured" });
  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ isAdmin:true, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.json({ success:true, token, message:"Admin ok" });
  }
  res.status(401).json({ success:false, message:"Invalid admin" });
}
