import Category from '../../../models/category';
import { sendSuccessResponse, sendErrorResponse, sendFailedResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const categoryCount = await Category.countDocuments();
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    if (!categoryCount) {
      sendSuccessResponse(res, 'Category list fetched', {
        count: categoryCount,
        pageCount: 1,
        list: [],
      });
    }

    const pageCount = Math.ceil(categoryCount / limit);
    if (pageNo <= pageCount) {
      const category = await Category.find({}, { __v: 0 }).skip(limit * (pageNo - 1)).limit(limit);
      sendSuccessResponse(res, 'Category list fetched', {
        count: categoryCount,
        pageCount,
        list: category,
      });
    } else {
      sendFailedResponse(res, 'It is not possible to split into so many elements');
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
