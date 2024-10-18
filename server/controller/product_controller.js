const Product = require('../models/product');
const RecentlyViewed = require('../models/recentlyViewed');


exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;  // Assuming you have user authentication middleware

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    // Record this product view
    await RecentlyViewed.findOneAndUpdate(
      { user: userId, product: productId },
      { $set: { viewedAt: new Date() } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      product
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;  // Assuming you have user authentication middleware

    // Get the user's recently viewed products
    const recentlyViewed = await RecentlyViewed.find({ user: userId })
      .sort('-viewedAt')
      .limit(5)
      .populate('product');

    // Extract categories and brands from recently viewed products
    const categories = recentlyViewed.map(rv => rv.product.category);
    const brands = recentlyViewed.map(rv => rv.product.brand);

    // Find similar products
    const recommendations = await Product.find({
      $or: [
        { category: { $in: categories } },
        { brand: { $in: brands } }
      ],
      _id: { $nin: recentlyViewed.map(rv => rv.product._id) }  // Exclude already viewed products
    })
      .limit(10)
      .populate('brand');

    res.status(200).json({
      recommendations
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
};
