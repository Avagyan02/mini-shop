import Product from '../../../models/product';
import Category from '../../../models/category';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function delProd(req, res) {
  try {
    const { product } = req;

    const updateCat = { $inc: { productCount: -1 } };
    product.deleted = true;

    await Promise.all([
      Category.updateOne({ _id: product.categoryId }, updateCat),
      product.save(),
    ]);

    sendSuccessResponse(res, 'Product deleted');
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default delProd;
