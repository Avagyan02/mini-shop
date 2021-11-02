import Category from '../../../models/category';
import Files from '../../../models/files';
import deleteFile from '../../../utils/deleteFile';
import saveImagesFrom from '../../../utils/saveImagesFrom';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function update(req, res) {
  try {
    const { product, category } = req;
    const { deleteImageIdList } = req.body;
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

    const promiseArr = [];
    if (deleteImageIdList) {
      if (deleteImageIdList.length === product.image.length && !req.files) {
        return sendFailedResponse(res, 'Cannot delete all photos');
      }
      deleteImageIdList.forEach((elem, i) => {
        const imageFind = product.image.find((item) => item.toString() === elem);
        if (!imageFind) {
          return sendFailedResponse(res);
        }
        promiseArr.push(Files.findOneAndDelete({ _id: elem }));
        deleteFile(req.files);
        product.image.splice(i, i + 1);
      });
    }
    const files = await saveImagesFrom(req.files);
    product.image.push(...files);

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
