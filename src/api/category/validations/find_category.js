import { HTTP_STATUS_CODE } from '../../../utils/constants';
import Category from '../../../models/category';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function searchCategory(req, res, next) {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return sendFailedResponse(res, 'Not Found', HTTP_STATUS_CODE.NOT_FOUND);
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default searchCategory;
