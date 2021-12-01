import Order from '../../../models/order';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function updatedOrder(req, res) {
  const { order } = req;
  order.status++;

  try {
    await order.save();
    sendSuccessResponse(res, 'Order updated');
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default updatedOrder;
