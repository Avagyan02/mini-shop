import { USER_ROLES, HTTP_STATUSES } from '../../../utils/constants';
import { sendFailedResponse, sendSuccessResponse } from '../../../utils/responseHelpers';

function getOrder(req, res) {
  const { order, user } = req;
  if (user.role === USER_ROLES.user && order.userId.toString() !== user._id.toString()) {
    return sendFailedResponse(res, HTTP_STATUSES.FORBIDDEN.message, HTTP_STATUSES.FORBIDDEN.code);
  }
  return sendSuccessResponse(res, 'Order details fetched', order);
}

export default getOrder;
