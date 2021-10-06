import Product from '../../../models/product';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const productCount = await Product.countDocuments();
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;

    if (!productCount) {
      return sendSuccessResponse(res, 'Product list fetched', {
        count: productCount,
        pageCount: 1,
        list: [],
      });
    }

    const pageCount = Math.ceil(productCount / limit);
    if (pageNo <= pageCount) {
      const product = await Product.find({}).skip(limit * (pageNo - 1)).limit(limit);
      sendSuccessResponse(res, 'Product list fetched', {
        count: productCount,
        pageCount,
        list: product,
      });
    } else {
      sendFailedResponse(res, 'It is not possible to split into so many elements');
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
