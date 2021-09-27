import Category from '../../../models/category';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function delCat(req, res) {
  try {
    await Category.findOneAndDelete({ _id: req.params.id });
    sendSuccessResponse(res, 'Category deleted');
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default delCat;
