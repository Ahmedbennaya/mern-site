import mongoose from 'mongoose';

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

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartItems: [cartItemSchema],
});


cartSchema.pre('save', async function (next) {
  for (const item of this.cartItems) {
    const product = await mongoose.model('Product').findById(item.product);
    if (product.quantity < item.quantity) {
      return next(new Error(`Insufficient stock for product ${product.name}`));
    }
  }
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
