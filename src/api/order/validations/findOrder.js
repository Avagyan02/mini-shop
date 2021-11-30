import Order from '../../../models/order';
import { ObjectIDRegexp } from '../../../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function findOrder(req, res, next) {
  try {
    const id = req.params.orderId;

    if (!ObjectIDRegexp.test(id)) {
      return sendFailedResponse(res);
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
