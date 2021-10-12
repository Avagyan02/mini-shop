import Product from '../../../models/product';
import Category from '../../../models/category';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function delProd(req, res) {
  try {
    const { product } = req;
    await Product.findOneAndDelete({ _id: product._id, deleted: false });
    const category = await Category.findOne({ _id: product.categoryId });
    category.productCount--;
    await category.save();
    sendSuccessResponse(res, 'Product deleted');
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default delProd;
