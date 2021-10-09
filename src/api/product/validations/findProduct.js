import Product from '../../../models/product';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function searchProduct(req, res, next) {
  try {
    const id = req.params.productId;
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return sendFailedResponse(res);
    }
    req.product = product;
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default searchProduct;
