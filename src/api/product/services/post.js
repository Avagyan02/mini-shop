import Product from '../../../models/product';
import Category from '../../../models/category';
import deleteFile from '../../../utils/deleteFile';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function create(req, res) {
  try {
    const path = req.files.map((elem) => elem.path);

    const product = await Product.create(
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

    const category = await Category.findOne({ _id: req.body.categoryId });
    category.productCount++;
    category.save();
    sendSuccessResponse(res, 'Product created', product);
  } catch (error) {
    deleteFile(req, res);
    sendErrorResponse(error, res);
  }
}

export default create;
