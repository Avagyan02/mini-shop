import Product from '../../../models/product';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const productCount = await Product.countDocuments();
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const productListQuant = productCount >= limit * pageNo;
    const pageCount = Math.ceil(productCount / limit);
    const message = 'Product list fetched';

    if (!productCount) {
      return sendSuccessResponse(res, message, {
        count: productCount,
        pageCount: 1,
        list: [],
      });
    }

    if (productListQuant) {
      const product = productCount.filter((elem) => {
        if (!elem.deleted) {
          return elem;
        }
      });
      if (product === limit) {
        return sendSuccessResponse(res, message, {
          count: productCount,
          pageCount,
          list: product,
        });
      } else if (product > limit) {
        return sendSuccessResponse(res, message, {
          count: productCount,
          pageCount,
          list: product.slice(limit * (pageNo - 1), limit * pageNo),
        });
      }
      return sendSuccessResponse(res, 'Not enough categories', {
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
