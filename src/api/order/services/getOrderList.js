import sendPaginatedOrderList from '../../../utils/sendPaginatedOrderList';
import { USER_ROLES } from '../../../utils/constants';
import { sendErrorResponse } from '../../../utils/responseHelpers';

function getOrderList(req, res) {
  try {
    const {
      limit, pageNo, status, dateFrom, dateTo,
    } = req.body;
    const { user } = req;
    let filter = {};

    if (status && user.role === USER_ROLES.user) {
      filter = { status: status, userId: user._id };
    } else if (status) {
      filter = { status: status };
    }

    if (dateFrom && dateTo) {
      filter.createDt = { $gte: dateFrom, $lte: dateTo };
    } else if (dateFrom) {
      filter.createDt = { $gte: dateFrom };
    } else if (dateTo) {
      filter.createDt = { $lte: dateTo };
    }

    return sendPaginatedOrderList(res, limit, pageNo, filter);
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}

export default getOrderList;
