import Category from '../../../models/category';
import { USER_ROLES } from '../../../utils/constants';
import sendPaginatedList from '../../../utils/sendPaginatedList';
import { sendErrorResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const { search } = req.query;
    const { notSelectedLanguages, selectedLanguage } = req;
    const filter = { deleted: false };
    const dispatchedLanguage = { name: `name${selectedLanguage}` };
    const regexpSearch = { $regex: `${search}`, $options: 'i' };
    const select = `-name${notSelectedLanguages[0]} -name${notSelectedLanguages[1]}`;
    if (search) {
      filter['$or'] = [
        { [`name${selectedLanguage}`]: regexpSearch },
        { [`name${notSelectedLanguages[0]}`]: regexpSearch },
        { [`name${notSelectedLanguages[1]}`]: regexpSearch },
      ];
    }

    if (!req.user || req.user.role === USER_ROLES.user) {
      filter.productCount = { $gte: 1 };
    }
    return await sendPaginatedList(res, Category, filter, pageNo, limit, select, dispatchedLanguage);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
