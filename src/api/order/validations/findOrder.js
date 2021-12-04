import Order from '../../../models/order';
import { ObjectIDRegexp, USER_ROLES, HTTP_STATUSES } from '../../../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function findOrder(req, res, next) {
  try {
    const { user } = req;
    const id = req.params.orderId;

    if (!ObjectIDRegexp.test(id)) {
      return sendFailedResponse(res);
    }

    const order = await Order.findOne({ _id: id });
    if (!order) {
      return sendFailedResponse(res);
    } else if (USER_ROLES.user === user.role && order.userId.toString() !== user._id.toString()) {
      return sendFailedResponse(res, HTTP_STATUSES.FORBIDDEN.message, HTTP_STATUSES.FORBIDDEN.code);
    }
    req.order = order;
    next();
  } catch (err) {
    sendErrorResponse(err, res);
  }
}

export default findOrder;
