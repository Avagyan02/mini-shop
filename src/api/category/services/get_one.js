import Category from '../../../models/category';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function read(req, res) {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (category) {
      sendSuccessResponse(res, 'Category details fetched', category);
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default read;
