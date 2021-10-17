import Category from '../../../models/category';
import { sendSuccessResponse, sendErrorResponse, sendFailedResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const categoryCount = await Category.countDocuments();
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const categoryListQuant = categoryCount >= limit * pageNo;
    const pageCount = Math.ceil(categoryCount / limit);
    const { user } = req;
    const message = 'Category list fetched';

    if (!categoryCount) {
      return sendSuccessResponse(res, message, {
        count: categoryCount,
        pageCount: 1,
        list: [],
      });
    }

    if (categoryListQuant) {
      const category = categoryCount.filter((elem) => {
        if (user.role === 1) {
          return elem;
        } else if (elem.productCount) {
          return elem;
        }
      });
      if (category.length === limit) {
        return sendSuccessResponse(res, message, {
          count: categoryCount,
          pageCount,
          list: category,
        });
      } else if (category.length > limit) {
        return sendSuccessResponse(res, message, {
          count: categoryCount,
          pageCount,
          list: category.slice(limit * (pageNo - 1), limit * pageNo),
        });
      }
      return sendSuccessResponse(res, 'Not enough categories', {
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
