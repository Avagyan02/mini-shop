import Category from '../../../models/category';
import { USER_ROLES } from '../../../utils/constants';
import sendPaginatedList from '../../../utils/sendPaginatedList';
import { sendErrorResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const { search } = req.query;
    const dispatchedLanguage = { name: `name${req.headers.language}` };
    const nameLanguages = ['nameHy', 'nameRu', 'nameEn'];
    const filter = { deleted: false };

    const name = nameLanguages.splice(
      nameLanguages.indexOf(dispatchedLanguage.name),
      nameLanguages.indexOf(dispatchedLanguage.name) + 1,
    )[0];
    const select = `-${nameLanguages[0]} -${nameLanguages[1]}`;
    filter[`${name}`] = { $regex: `${search}`, $options: 'i' };

    if (!req.user || req.user.role === USER_ROLES.user) {
      filter.productCount = { $gte: 1 };
    }
    return sendPaginatedList(res, Category, filter, pageNo, limit, select, dispatchedLanguage);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
