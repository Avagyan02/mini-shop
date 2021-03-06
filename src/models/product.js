import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nameEn: {
    type: String,
    required: true,
  },
  nameRu: {
    type: String,
    required: true,
  },
  nameHy: {
    type: String,
    required: true,
  },
  descriptionEn: {
    type: String,
    required: true,
  },
  descriptionRu: {
    type: String,
    required: true,
  },
  descriptionHy: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: 'Quantity is required',
  },
  image: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'files',
  }],
  price: {
    type: Number,
    required: 'Price is required',
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createDt: {
    type: Date,
    default: Date.now,
  },
  updateDt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('product', productSchema);
export default Product;
