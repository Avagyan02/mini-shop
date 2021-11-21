import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function read(req, res) {
  try {
    const { product } = req;
    product.viewCount++;
    await product.save();
    sendSuccessResponse(res, 'Product details fetched', product);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default read;
