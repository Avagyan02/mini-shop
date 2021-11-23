import Product from '../../../models/product';
import { ObjectIDRegexp } from '../../../utils/constants';
import deleteFile from '../../../utils/deleteFile';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function searchProduct(req, res, next) {
  try {
    const id = req.params.productId;
    const { notSelectedLanguages } = req;

    if (!ObjectIDRegexp.test(id)) {
      deleteFile(req.files);
      return sendFailedResponse(res);
    }
    const product = await Product
      .findOne({ _id: id, deleted: false })
      .select(`-name${notSelectedLanguages[0]} -name${notSelectedLanguages[1]} 
        -description${notSelectedLanguages[0]} -description${notSelectedLanguages[1]}`);
    if (!product) {
      deleteFile(req.files);
      return sendFailedResponse(res);
    }
    req.product = product;
    next();
  } catch (error) {
    deleteFile(req.files);
    sendErrorResponse(error, res);
  }
}

export default searchProduct;
