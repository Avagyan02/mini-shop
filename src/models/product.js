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
  category_id: {
    type: Number,
    required: 'Category is required',
  },
  createDt: {
    type: Date,
    default: Date.now,
  },
  updateDt: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    default: 1,
    required: 'Quantity is required',
  },
  image: {
    type: String,
    required: 'Image is required',
  },
  price: {
    type: Number,
    required: 'Price is required',
  },
  description: {
    type: String,
    required: 'Description is required',
  },
});

const Prod = mongoose.model('product_collections', productSchema);
export default Prod;
