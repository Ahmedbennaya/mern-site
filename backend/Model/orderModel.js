import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: {
        type: String,
        required: true, // Make phone number required
        validate: {
          validator: function(v) {
            return /\d{10,15}/.test(v); // Validate that the phone number is between 10 and 15 digits
          },
          message: props => `${props.value} is not a valid phone number!`
        }
      },
    },
    paymentMethod: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    isConfirmed: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
