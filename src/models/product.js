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
  image: {
    type: String,
    required: 'Image is required',
  },
  price: {
    type: Number,
    required: 'Price is required',
  },
  createdBy: [{ type: mongoose.schema.Types.ObjectId, ref: 'users' }],
  categoryId: [{ type: mongoose.schema.Types.ObjectId, ref: 'categories_collections' }],
  createDt: {
    type: Date,
    default: Date.now,
  },
  updateDt: {
    type: Date,
    default: Date.now,
  },
});

const Prod = mongoose.model('product_collections', productSchema);
export default Prod;
