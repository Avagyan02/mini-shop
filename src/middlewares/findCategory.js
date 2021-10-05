import { HTTP_STATUSES } from '../utils/constants';
import Category from '../models/category';
import { sendFailedResponse, sendErrorResponse } from '../utils/responseHelpers';

async function searchCategory(req, res, next) {
  try {
    const id = req.params.categoryId || req.body.categoryId;
    const category = await Category.findOne({ _id: id });
    if (!category) {
      return sendFailedResponse(res, HTTP_STATUSES.NOT_FOUND);
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default searchCategory;
