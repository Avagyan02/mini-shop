import Category from '../../../models/category';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function delCat(req, res) {
  try {
    const { category } = req;
    if (!category.productCount) {
      category.deleted = true;
      await category.save();
      sendSuccessResponse(res, 'Category deleted');
    } else {
      sendFailedResponse(res, 'There are products in the category');
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default delCat;
