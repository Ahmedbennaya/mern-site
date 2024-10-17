import mongoose from 'mongoose';

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1, 'Quantity must be at least 1'],
  },
});

// Cart Schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartItems: [cartItemSchema],
});

// Pre-save hook to check stock
cartSchema.pre('save', async function (next) {
  for (const item of this.cartItems) {
    const product = await mongoose.model('Product').findById(item.product);
    if (!product) {
      return next(new Error(`Product not found`));
    }
    if (product.quantity < item.quantity) {
      return next(new Error(`Insufficient stock for product ${product.name}`));
    }
  }
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
