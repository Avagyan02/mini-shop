import Product from '../../../models/product';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const filter = { deleted: false };
    const message = 'Product list fetched';

    const filteredProductCount = await Product.countDocuments(filter);
    if (limit * pageNo > filteredProductCount) {
      return sendFailedResponse(res, 'It is not possible to split into so many elements');
    }

    const filteredProduct = await Product.find(filter).skip((pageNo - 1) * limit).limit(limit);
    return sendSuccessResponse(res, message, {
      count: filteredProductCount,
      pageCount: Math.ceil(filteredProductCount / pageNo),
      list: filteredProduct,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
