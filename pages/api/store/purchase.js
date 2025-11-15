import dbConnect from "../../../lib/mongoose";
import User from "../../../models/User";
import StoreProduct from "../../../models/StoreProduct";
import Transaction from "../../../models/Transaction";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { userId, productId } = req.body || {};
  await dbConnect();
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success:false, message:"User not found" });
    const product = await StoreProduct.findById(productId);
    if (!product) return res.status(404).json({ success:false, message:"Product not found" });
    if (user.gemasGo < product.price) return res.status(400).json({ success:false, message:"Insufficient GemasGo" });
    user.gemasGo -= product.price;
    if (product.type === "lives") user.lives += product.quantity;
    if (product.type === "gemas") user.gemasGo += product.quantity;
    await user.save();
    await Transaction.create({ userId: user._id, type: "purchase", amount: product.price, meta: { productId } });
    res.json({ success:true, newBalance: user.gemasGo, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:"Server error" });
  }
}
