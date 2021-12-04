import Order from '../../../models/order';
import sendPaginatedList from '../../../utils/sendPaginatedList';
import { USER_ROLES } from '../../../utils/constants';
import { sendErrorResponse } from '../../../utils/responseHelpers';

async function getOrderList(req, res) {
  try {
    const {
      limit, pageNo, status, dateFrom, dateTo,
    } = req.body;
    const { user } = req;
    const filter = {};

    if (user.role === USER_ROLES.user) {
      filter.userId = user._id;
    }

    if (status) {
      filter.status = status;
    }

    if (dateFrom && dateTo) {
      filter.createDt = { $gte: dateFrom, $lte: dateTo };
    } else if (dateFrom) {
      filter.createDt = { $gte: dateFrom };
    } else if (dateTo) {
      filter.createDt = { $lte: dateTo };
    }

    return await sendPaginatedList(res, Order, filter, pageNo, limit);
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}

export default getOrderList;
