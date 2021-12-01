import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

function read(req, res) {
  const { category, selectedLanguage } = req;
  const { [`name${selectedLanguage}`]: name, ...rest } = category._doc;
  sendSuccessResponse(res, 'Category details fetched', { name, ...rest });
}

export default read;
