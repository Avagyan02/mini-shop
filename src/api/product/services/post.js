import Product from '../../../models/product';
import Category from '../../../models/category';
import deleteFile from '../../../utils/deleteFile';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function create(req, res) {
  const path = req.files.map((elem) => elem.path);
  console.log(path, req.files);
  const product = Product.create(
    {
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
    },
  );
  const { category } = req;
  const update = { $inc: { productCount: 1 } };

  const updatedCategory = Category.updateOne(category, update);

  try {
    await Promise.all([updatedCategory, product]);
    console.log(product);
    sendSuccessResponse(res, 'Product created');
  } catch (error) {
    deleteFile(req.files);
    sendErrorResponse(error, res);
  }
}

export default create;
