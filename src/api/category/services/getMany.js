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

    const filteredCategory = await Category.find(filter);
    console.log(filteredCategory);
    if (pageNo * limit > filteredCategory.length) {
      return sendFailedResponse(res, 'It is not possible to split into so many elements');
    }
    return sendSuccessResponse(res, message, {
      count: filteredCategory.length,
      pageCount: Math.ceil(filteredCategory.length / limit),
      list: limit !== filteredCategory.length ? filteredCategory.slice((pageNo * limit), (pageNo + 1) * limit) : filteredCategory,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
