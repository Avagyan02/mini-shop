import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
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
  productCount: {
    type: Number,
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  updateDt: {
    type: Date,
    default: Date.now,
  },
  createDt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model('categories', categorySchema);
export default Category;
