import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function read(req, res) {
  try {
    const { category, selectedLanguage } = req;
    const { [`name${selectedLanguage}`]: name, ...rest } = category._doc;
    sendSuccessResponse(res, 'Category details fetched', { name, ...rest });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default read;
