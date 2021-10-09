import Category from '../../../models/category';
import { HTTP_STATUSES } from '../../../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function searchCategory(req, res, next) {
  try {
    const id = req.params.categoryId;
    const category = await Category.findOne({ _id: id });
    if (!category) {
      return sendFailedResponse(res);
    }

    if (req.role !== 1) {
      if (!category.productCount) {
        return sendFailedResponse(res, HTTP_STATUSES.FORBIDDEN.message, HTTP_STATUSES.FORBIDDEN.code);
      } else {
        next();
      }
    } else if (category.deleted) {
      return sendFailedResponse(res);
    } else {
      req.category = category;
      next();
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default searchCategory;
