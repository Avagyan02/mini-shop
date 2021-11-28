import Product from '../../../models/product';
import { ObjectIDRegexp } from '../../../utils/constants';
import deleteFile from '../../../utils/deleteFile';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function searchProduct(req, res, next) {
  try {
    const id = req.params.productId;
    const { notSelectedLanguages } = req;
    const filter = { _id: id, deleted: false };
    let product;

    if (!ObjectIDRegexp.test(id)) {
      deleteFile(req.files);
      return sendFailedResponse(res);
    }
    if (req.method === 'GET') {
      product = await Product
        .findOne(filter)
        .select(`-name${notSelectedLanguages[0]} -name${notSelectedLanguages[1]} 
          -description${notSelectedLanguages[0]} -description${notSelectedLanguages[1]}`);
    } else {
      product = await Product.findOne(filter);
    }
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
