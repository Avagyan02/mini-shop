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
});

const Category = mongoose.model('categories_collections', categorySchema);
export default Category;