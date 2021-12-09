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

    const filter = { _id: id };
    if (USER_ROLES.user === user.role) {
      filter.userId = user._id;
    }

    const order = await Order.findOne({ _id: id });
    if (!order) {
      return sendFailedResponse(res);
    }
    req.order = order;
    next();
  } catch (err) {
    sendErrorResponse(err, res);
  }
}

export default findOrder;
