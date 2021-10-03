import Product from '../../../models/product';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function create(req, res) {
  try {
    const product = await Product.create(
      {
        nameEn: req.body.nameEn,
        nameRu: req.body.nameRu,
        nameHy: req.body.nameHy,
        descriptionEn: req.body.descriptionEn,
        descriptionRu: req.body.descriptionRu,
        descriptionHy: req.body.descriptionHy,
        quantity: req.body.quantity,
        image: req.body.image,
        price: req.body.price,
        createdBy: req.body.createdBy,
        categoryId: req.body.categoryId,
      },
    );
    sendSuccessResponse(res, 'Product created', product);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}
