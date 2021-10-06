import { HTTP_STATUSES } from '../../../utils/constants';
import Product from '../../../models/product';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function searchProduct(req, res, next) {
  try {
    const product = await Product.findOne({ _id: req.params.productId });
    if (!product) {
      return sendFailedResponse(res, HTTP_STATUSES.NOT_FOUND);
    }
    req.viewCount = product.viewCount;
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default searchProduct;
