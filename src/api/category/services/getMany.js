import Category from '../../../models/category';
import { HTTP_STATUSES, USER_ROLES } from '../../../utils/constants';
import { sendSuccessResponse, sendErrorResponse, sendFailedResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const filter = { deleted: false };
    const message = 'Category list fetched';

    if (!req.user || req.user.role === USER_ROLES.user) {
      filter.productCount = { $gte: 1 };
    }

    const filteredCategoryCount = await Category.countDocuments(filter);
    if (pageNo * limit > filteredCategoryCount) {
      return sendFailedResponse(res, 'It is not possible to split into so many elements');
    }

    const filteredCategory = await Category.find(filter).skip((pageNo - 1) * limit).limit(limit);
    return sendSuccessResponse(res, message, {
      count: filteredCategoryCount,
      pageCount: Math.ceil(filteredCategoryCount / limit),
      list: filteredCategory,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
