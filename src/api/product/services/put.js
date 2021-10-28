import Category from '../../../models/category';
import deleteFile from '../../../utils/deleteFile';
import saveFilesFromUploads from '../../../utils/saveFilesFromUploads';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function update(req, res) {
  try {
    const { product, category } = req;
    const files = await saveFilesFromUploads(res, req.files);
    const date = Date.now();
    product.nameEn = req.body.nameEn;
    product.nameRu = req.body.nameRu;
    product.nameHy = req.body.nameHy;
    product.descriptionEn = req.body.descriptionEn;
    product.descriptionRu = req.body.descriptionRu;
    product.descriptionHy = req.body.descriptionHy;
    product.price = +req.body.price;
    product.quantity = +req.body.quantity;
    product.updateDt = date;
    product.image.push(...files);

    const promiseArr = [];

    if (category._id !== product.categoryId) {
      const decCat = { $inc: { productCount: -1 } };
      const incCat = { $inc: { productCount: 1 } };

      promiseArr.push(Category.updateOne({ _id: product.categoryId }, decCat));
      promiseArr.push(Category.updateOne({ _id: req.body.categoryId }, incCat));
    }

    product.categoryId = category._id;
    await Promise.all(promiseArr, product.save());
    sendSuccessResponse(res, 'Product updated', product);
  } catch (error) {
    deleteFile(req.files);
    sendErrorResponse(error, res);
  }
}

export default update;
