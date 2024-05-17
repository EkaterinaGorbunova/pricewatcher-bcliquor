import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  currency: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  priceHistory: [
    { 
      price: { type: Number, required: true },
      date: { type: Date, default: Date.now }
    },
  ],
  lowestPrice: { type: Number },
  highestPrice: { type: Number },
  averagePrice: { type: Number },
  discountRate: { type: Number },
  description: { type: String },
  category: { type: String },
  stars: { type: Number },
  reviewsCount: { type: Number },
  recommendationRate: { type: Number },
  isOutOfStock: { type: Boolean, default: false },
  users: [
    {email: { type: String, required: true}}
  ], default: [],
}, { timestamps: true });

// Mongoose by default creates collections with a pluralized form of the model name (test.productbcliquors - in MongoDB)
const Product = mongoose.models.ProductBcLiquor || mongoose.model('ProductBcLiquor', productSchema); // create a new collection ProductBcLiquor for products

export default Product;