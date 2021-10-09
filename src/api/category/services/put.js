import Category from '../../../models/category';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function update(req, res) {
  try {
    const date = new Date();
    const category = await Category.findOneAndUpdate({ _id: req.params.categoryId }, {
      $set: {
        nameEn: req.body.nameEn,
        nameRu: req.body.nameRu,
        nameHy: req.body.nameHy,
        updateDt: date,
      },
    }, { new: true });
    sendSuccessResponse(res, 'Category updated', category);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default update;
