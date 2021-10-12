import Category from '../../../models/category';
import { HTTP_STATUSES, ObjectIDRegexp } from '../../../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function searchCategory(req, res, next) {
  try {
    const id = req.params.categoryId;
    if (!ObjectIDRegexp.test(id)) {
      return sendFailedResponse(res);
    } else {
      const { user } = req;
      const category = await Category.findOne({ _id: id, deleted: false });
      if (!category) {
        return sendFailedResponse(res);
      }
      if (user.role !== 1) {
        if (!category.productCount) {
          return sendFailedResponse(res, HTTP_STATUSES.FORBIDDEN.message, HTTP_STATUSES.FORBIDDEN.code);
        } else {
          req.category = category;
          next();
        }
      } else {
        req.category = category;
        next();
      }
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default searchCategory;
