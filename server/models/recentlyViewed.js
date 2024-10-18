const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecentlyViewedSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  viewedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure a user can only have one entry per product
RecentlyViewedSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('RecentlyViewed', RecentlyViewedSchema);