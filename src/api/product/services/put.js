import Product from '../../../models/product';
import Category from '../../../models/category';
import deleteFile from '../../../utils/deleteFile';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function update(req, res) {
  try {
    const { product, category, user } = req;
    const path = req.files.map((elem) => elem.path);
    const date = Date.now();
    const productDetails = {
      nameEn: req.body.nameEn,
      nameRu: req.body.nameRu,
      nameHy: req.body.nameHy,
      descriptionEn: req.body.descriptionEn,
      descriptionRu: req.body.descriptionRu,
      descriptionHy: req.body.descriptionHy,
      categoryId: category._id,
      price: +req.body.price,
      quantity: +req.body.quantity,
      updateDt: date,
    };
    // image: product.image.concat(path),

    if (category._id === product.categoryId) {
      const updatedProduct = await Product.updateOne({ _id: product._id }, { ...productDetails }, { new: true });
      sendSuccessResponse(res, 'Product updated', updatedProduct);
    } else {
      const decCat = { $inc: { productCount: -1 } };
      const incCat = { $inc: { productCount: 1 } };
      const updatedProduct = Product.updateOne({ _id: product._id }, { ...productDetails }, { new: true });
      await Promise.all([
        Category.updateOne({ _id: product.categoryId }, decCat),
        Category.updateOne({ _id: req.body.categoryId }, incCat),
        updatedProduct,
      ]);
      sendSuccessResponse(res, 'Product updated', updatedProduct);
    }
  } catch (error) {
    deleteFile(req.files);
    sendErrorResponse(error, res);
  }
}

export default update;
