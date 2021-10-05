import Product from '../../../models/product';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function update(req, res) {
  try {
    const product = await Product.findOneAndUpdate({ id: req.params.productId }, {
      $set: {
        nameEn: req.body.nameEn,
        nameRu: req.body.nameRu,
        nameHy: req.body.nameHy,
        descriptionEn: req.body.descriptionEn,
        descriptionRu: req.body.descriptionRu,
        descriptionHy: req.body.descriptionHy,
        quantity: req.body.quantity,
        image: req.file ? req.file.path : '',
        price: req.body.price,
        createdBy: req.user._id,
        categoryId: req.body.categoryId,
      },
    }, { new: true });
    sendSuccessResponse(res, 'Product updated', product);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default update;
