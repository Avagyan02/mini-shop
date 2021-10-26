import Product from '../../../models/product';
import { ObjectIDRegexp } from '../../../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function searchProduct(req, res, next) {
  try {
    const id = req.params.productId;
    if (!ObjectIDRegexp.test(id)) {
      console.log(1);
      return sendFailedResponse(res);
    }
    const product = await Product.findOne({ _id: id, deleted: false });
    if (!product) {
      console.log(2);
      return sendFailedResponse(res);
    }
    console.log(3);
    req.product = product;
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default searchProduct;
