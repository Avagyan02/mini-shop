import Category from '../../../models/category';
import { USER_ROLES } from '../../../utils/constants';
import sendPaginatedList from '../../../utils/sendPaginatedList';
import { sendErrorResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const filter = { deleted: false };

    if (!req.user || req.user.role === USER_ROLES.user) {
      filter.productCount = { $gte: 1 };
    }

    return sendPaginatedList(res, Category, filter, pageNo, limit);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
