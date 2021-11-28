import Joi from 'joi';
import Order from '../../../models/order';
import { ObjectIDRegexp } from '../../../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function findOrder(req, res, next) {
  try {
    const orderStatus = +req.headers['order-status'];
    const Id = req.params.orderId;

    if (!ObjectIDRegexp.test(Id) || !orderStatus || orderStatus > 3 || orderStatus < 2) {
      return sendFailedResponse(res);
    }

    const order = await Order.findOne({ _id: Id });
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
