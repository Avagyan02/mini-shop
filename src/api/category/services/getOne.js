import Category from '../../../models/category';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function read(req, res) {
  try {
    const { category } = req;
    sendSuccessResponse(res, 'Category details fetched', category);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default read;
