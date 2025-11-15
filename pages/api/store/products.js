import dbConnect from "../../../lib/mongoose";
import StoreProduct from "../../../models/StoreProduct";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const products = await StoreProduct.find({ enabled: true }).lean();
    if (!products || products.length === 0) {
      const defaults = [
        { title:"Vidas x5", type:"lives", price:50, quantity:5 },
        { title:"100 GemasGo", type:"gemas", price:100, quantity:100 },
        { title:"Diamantes FF x10", type:"diamonds", price:500, quantity:10 }
      ];
      await StoreProduct.insertMany(defaults);
      return res.json({ success:true, products: defaults });
    }
    return res.json({ success:true, products });
  }
  res.status(405).end();
}
