import Product from '../../../models/product';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const filter = { deleted: false };
    const message = 'Product list fetched';

    const filteredProduct = await Product.find(filter);
    if (limit * pageNo > filteredProduct.length) {
      return sendFailedResponse(res, 'It is not possible to split into so many elements');
    }
    return sendSuccessResponse(res, message, {
      count: filteredProduct.length,
      pageCount: Math.ceil(filteredProduct.length / pageNo),
      list: limit !== filteredProduct.length ? filteredProduct.slice((pageNo * limit), (pageNo + 1) * limit) : filteredProduct,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
