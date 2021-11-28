import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  productList: [{
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number, min: 1, required: true },
    price: { type: Number, required: true },
  }],
  price: {
    type: Number,
    min: 1,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
    max: 3,
    required: true,
  },
  createDt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('orders', orderSchema);
export default Order;
