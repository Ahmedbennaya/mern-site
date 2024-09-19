import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  inStock: { type: Boolean, required: true },
  subcategory: [String],
  colors: [String],
});

const Product = mongoose.model('Product', productSchema);
export default Product;
