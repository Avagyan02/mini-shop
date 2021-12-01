import Category from '../../../models/category';
import { ObjectIDRegexp } from '../../../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function searchCategory(req, res, next) {
  try {
    const id = req.params.categoryId;
    const { notSelectedLanguages } = req;
    const filter = { _id: id, deleted: false };
    let category;

    if (!ObjectIDRegexp.test(id)) {
      return sendFailedResponse(res);
    }

    if (req.method === 'GET') {
      category = await Category
        .findOne(filter)
        .select(`-name${notSelectedLanguages[0]} -name${notSelectedLanguages[1]}`);
    } else {
      category = await Category.findOne(filter);
    }

    if (!category) {
      return sendFailedResponse(res);
    }
    req.category = category;
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default searchCategory;
