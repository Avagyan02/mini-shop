import Category from '../../../models/category';
import { sendSuccessResponse, sendErrorResponse, sendFailedResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const categoryCount = await Category.countDocuments();
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const { user } = req;
    let category = [];
    if (!categoryCount) {
      return sendSuccessResponse(res, 'Category list fetched', {
        count: categoryCount,
        pageCount: 1,
        list: [],
      });
    }

    const pageCount = Math.ceil(categoryCount / limit);
    if (pageNo <= pageCount) {
      const categoryList = await Category.find({ deleted: false }, { __v: 0 }).skip(limit * (pageNo - 1)).limit(limit);
      category = categoryList.filter((elem) => {
        if (!elem.deleted) {
          if (user.role === 1) {
            return elem;
          } else if (elem.productCount) {
            return elem;
          }
        }
      });
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
