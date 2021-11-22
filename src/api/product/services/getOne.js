import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function read(req, res) {
  try {
    const { product, selectedLanguages } = req;
    product.viewCount++;
    await product.save();
    const {
      [`name${selectedLanguages}`]: name,
      [`description${selectedLanguages}`]: description,
      ...rest
    } = product._doc;
    sendSuccessResponse(res, 'Product details fetched', { name, description, ...rest });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default read;
