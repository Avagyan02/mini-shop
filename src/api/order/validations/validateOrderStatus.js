import { sendFailedResponse } from '../../../utils/responseHelpers';

function validateOrderStatus(req, res, next) {
  const { order } = req;
  const orderStatus = +req.headers.orderstatus;

  switch (true) {
    case orderStatus > 3:
    case orderStatus < 2:
    case !orderStatus:
    case order.status === 3:
    case ++order.status !== orderStatus:
      return sendFailedResponse(res);
    default:
      next();
      break;
  }
}

export default validateOrderStatus;
