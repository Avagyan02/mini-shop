import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function read(req, res) {
  try {
    const { category } = req;
    sendSuccessResponse(res, 'Category details fetched', category);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default read;
