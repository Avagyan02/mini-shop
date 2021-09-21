import Category from '../../../models/category';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function delCat(req, res) {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id });
    if (category) {
      sendSuccessResponse(res, 'Category deleted', null);
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default delCat;
