const StoreProduct = require('../models/StoreProduct');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const listProducts = async (req, res) => {
  try {
    let products = await StoreProduct.find({ enabled: true }).lean();
    if (!products || products.length === 0) {
      const defaults = [
        { title:'Vidas x5', type:'lives', price:50, quantity:5 },
        { title:'100 GemasGo', type:'gemas', price:100, quantity:100 },
        { title:'Diamantes FF x10', type:'diamonds', price:500, quantity:10 }
      ];
      await StoreProduct.insertMany(defaults);
      products = defaults;
    }
    return res.json({ success:true, products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Server error' });
  }
};

const purchase = async (req, res) => {
  try {
    const { userId, productId } = req.body || {};
    const user = await User.findById(userId);
    const product = await StoreProduct.findById(productId);
    if (!user || !product) return res.status(404).json({ success:false, message:'Not found' });

    if (user.gemasGo < product.price) return res.status(400).json({ success:false, message:'Insufficient GemasGo' });

    user.gemasGo -= product.price;
    if (product.type === 'lives') user.lives += product.quantity;
    if (product.type === 'gemas') user.gemasGo += product.quantity;
    await user.save();

    await Transaction.create({ userId: user._id, type: 'purchase', amount: product.price, meta: { productId } });
    return res.json({ success:true, newBalance: user.gemasGo, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Server error' });
  }
};

module.exports = { listProducts, purchase };
