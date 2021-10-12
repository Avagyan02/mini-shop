import Product from '../../../models/product';
import deleteFile from '../../../utils/deleteFile';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function update(req, res) {
  try {
    const { product } = req;
    const { _id } = req.user;
    const path = req.files.map((elem) => elem.path);
    const date = Date.now();
    if (req.body.categoryId === product.categoryId) {
      product.nameEn = req.body.nameEn;
      product.nameRu = req.body.nameRu;
      product.nameHy = req.body.nameHy;
      product.descriptionEn = req.body.descriptionEn;
      product.descriptionRu = req.body.descriptionRu;
      product.descriptionHy = req.body.descriptionHy;
      product.categoryId = req.body.categoryId;
      product.price = req.body.price;
      product.image = path;
      product.createdBy = _id;
      product.updateDt = date;
      product.save();
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
