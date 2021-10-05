import Product from '../../../models/product';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function delProd(req, res) {
  try {
    await Product.findOneAndDelete({ _id: req.params.productId });
    sendSuccessResponse(res, 'Category deleted');
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default delProd;
