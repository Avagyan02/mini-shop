import Product from '../../../models/product';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function read(req, res) {
  try {
    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.productId,
      },
      {
        $set: {
          viewCount: ++req.viewCount,
        },
      },
    );
    sendSuccessResponse(res, 'Product details fetched', product);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default read;
