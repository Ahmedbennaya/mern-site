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
        required: true,
        validate: {
          validator: function(v) {
            // Validate international phone numbers in E.164 format
            return /^\+?[1-9]\d{1,14}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number! It must be in the E.164 format.`,
        },
      },
    },
    paymentMethod: { type: String, required: true }, // e.g., 'Credit Card', 'PayPal'
    totalAmount: { type: Number, required: true },   // Total cost of the order
    isConfirmed: { type: Boolean, default: false },  // Whether the order is confirmed
    isShipped: { type: Boolean, default: false },    // Shipping status
    isDelivered: { type: Boolean, default: false },  // Delivery status
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
