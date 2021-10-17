import Product from '../../../models/product';
import Category from '../../../models/category';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function delProd(req, res) {
  try {
    const { product } = req;
    const updateCat = { $inc: { productCount: -1 } };
    const updatedCategory = Category.update({ _id: product.categoryId }, updateCat);
    product.deleted = true;

    await Promise.all([updatedCategory, product.save()]);
    sendSuccessResponse(res, 'Product deleted');
  } catch (error) {
    console.log(2);
    sendErrorResponse(error, res);
  }
}

export default delProd;
