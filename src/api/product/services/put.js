import Product from '../../../models/product';
import deleteFile from '../../../utils/deleteFile';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function update(req, res) {
  try {
    const { product } = req;
    const path = req.files.map((elem) => elem.path);
    const date = Date.now();
    if (req.body.categoryId === product.categoryId) {
      await Product.findOneAndUpdate({ id: product.productId }, {
        $set: {
          nameEn: req.body.nameEn,
          nameRu: req.body.nameRu,
          nameHy: req.body.nameHy,
          descriptionEn: req.body.descriptionEn,
          descriptionRu: req.body.descriptionRu,
          descriptionHy: req.body.descriptionHy,
          quantity: req.body.quantity,
          image: path,
          price: req.body.price,
          createdBy: req.user._id,
          categoryId: req.body.categoryId,
          updateDt: date,
        },
      }, { new: true });
      sendSuccessResponse(res, 'Product updated', product);
    } else {
      deleteFile(req, res);
      sendFailedResponse(res);
    }
  } catch (error) {
    deleteFile(req, res);
    sendErrorResponse(error, res);
  }
}

export default update;
