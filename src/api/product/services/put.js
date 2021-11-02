import Category from '../../../models/category';
import Files from '../../../models/files';
import deleteFile from '../../../utils/deleteFile';
import intersectFileId from '../../../utils/intersectFileId';
import saveImagesFrom from '../../../utils/saveImagesFrom';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function update(req, res) {
  try {
    const { product, category } = req;
    const { deleteImageIdList } = req.body;
    const files = await saveImagesFrom(req.files);
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
    if (deleteImageIdList) {
      const result = intersectFileId(product.image, deleteImageIdList);
      if (result === product.image.length) {
        return sendFailedResponse(res, 'Cannot delete all photos');
      } else if (result === deleteImageIdList.length) {
        deleteImageIdList.filter((elem, i) => {
          promiseArr.push(Files.findOneAndDelete({ _id: elem }));
          product.image.splice(i, i + 1);
        });
      } else {
        return sendFailedResponse(res);
      }
    }

    if (category._id !== product.categoryId) {
      const decCat = { $inc: { productCount: -1 } };
      const incCat = { $inc: { productCount: 1 } };

      promiseArr.push(Category.updateOne({ _id: product.categoryId }, decCat));
      promiseArr.push(Category.updateOne({ _id: req.body.categoryId }, incCat));
    }

    product.categoryId = category._id;
    await Promise.all([...promiseArr, product.save()]);
    sendSuccessResponse(res, 'Product updated', product);
  } catch (error) {
    deleteFile(req.files);
    sendErrorResponse(error, res);
  }
}

export default update;
