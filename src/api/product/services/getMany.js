import Product from '../../../models/product';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const productCount = await Product.countDocuments();
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const productListQuant = productCount < limit * pageNo;
    const pageCount = Math.ceil(productCount / limit);
    const filter = { deleted: false };
    const message = 'Product list fetched';

    if (!productCount) {
      return sendSuccessResponse(res, message, {
        count: productCount,
        pageCount: 1,
        list: [],
      });
    } else if (productListQuant) {
      return sendFailedResponse(res, 'It is not possible to split into so many elements');
    }

    const productList = await Product.find(filter).skip((pageNo - 1) * limit).limit(limit);
    return sendSuccessResponse(res, message, {
      count: productList.length,
      pageCount,
      list: productList,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
