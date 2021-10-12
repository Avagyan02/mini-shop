import Category from '../../../models/category';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function update(req, res) {
  try {
    const date = new Date();
    const { category } = req;
    category.nameEn = req.body.nameEn;
    category.nameRu = req.body.nameRu;
    category.nameHy = req.body.nameHy;
    category.updateDt = date;
    category.save();
    sendSuccessResponse(res, 'Category updated', category);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default update;
