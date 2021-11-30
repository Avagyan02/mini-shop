import Order from '../../../models/order';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function updatedOrder(req, res) {
  const { order } = req;
  const orderStatus = +req.headers.orderstatus;
  order.status = orderStatus;

  try {
    await order.save();
    sendSuccessResponse(res, 'Order updated');
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default updatedOrder;
