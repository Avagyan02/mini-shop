import Category from '../../../models/category';
import { USER_ROLES } from '../../../utils/constants';
import { sendSuccessResponse, sendErrorResponse, sendFailedResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const categoryCount = await Category.countDocuments();
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const categoryListQuant = categoryCount < limit * pageNo;
    const pageCount = Math.ceil(categoryCount / limit);
    const filter = { deleted: false };
    const message = 'Category list fetched';

    if (!categoryCount) {
      return sendSuccessResponse(res, message, {
        count: categoryCount,
        pageCount: 1,
        list: [],
      });
    } else if (categoryListQuant) {
      return sendFailedResponse(res, 'It is not possible to split into so many elements');
    }

    if (!req.user || req.user.role === USER_ROLES.user) {
      filter.productCount = { $gte: 1 };
    }
    const categoryList = await Category.find(filter).skip((pageNo - 1) * limit).limit(limit);
    return sendSuccessResponse(res, message, {
      count: categoryList.length,
      pageCount,
      list: categoryList,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
