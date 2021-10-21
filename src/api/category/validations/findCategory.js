import Category from '../../../models/category';
import { HTTP_STATUSES, ObjectIDRegexp } from '../../../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function searchCategory(req, res, next) {
  try {
    const id = req.params.categoryId;
    if (!ObjectIDRegexp.test(id)) {
      return sendFailedResponse(res);
    }
    const category = await Category.findOne({ _id: id, deleted: false });
    if (!category) {
      return sendFailedResponse(res);
    }
    req.category = category;
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default searchCategory;
