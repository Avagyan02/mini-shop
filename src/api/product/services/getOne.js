import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function read(req, res) {
  try {
    const { product, selectedLanguage } = req;
    product.viewCount++;
    await product.save();
    const {
      [`name${selectedLanguage}`]: name,
      [`description${selectedLanguage}`]: description,
      ...rest
    } = product._doc;
    sendSuccessResponse(res, 'Product details fetched', { name, description, ...rest });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default read;
