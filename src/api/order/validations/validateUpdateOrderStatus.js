import { OrderStatuses } from '../../../utils/constants';
import { sendFailedResponse } from '../../../utils/responseHelpers';

function validateUpdateOrderStatus(req, res, next) {
  const { order } = req;

  if (order.status === OrderStatuses.done) {
    return sendFailedResponse(res);
  }
  next();
}

export default validateUpdateOrderStatus;
