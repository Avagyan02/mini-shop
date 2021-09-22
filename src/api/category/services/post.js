import Category from '../../../models/category';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function create(req, res) {
  try {
    const category = await Category.create({ nameEn: req.body.nameEn, nameRu: req.body.nameRu, nameHy: req.body.nameHy });
    sendSuccessResponse(res, 'Category created', category);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default create;
