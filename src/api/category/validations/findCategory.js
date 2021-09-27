import { HTTP_STATUSES } from '../../../utils/constants';
import Category from '../../../models/category';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function searchCategory(req, res, next) {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return sendFailedResponse(res, HTTP_STATUSES.NOT_FOUND.message, HTTP_STATUSES.NOT_FOUND.code);
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default searchCategory;
