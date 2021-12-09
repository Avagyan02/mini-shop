import { USER_ROLES, HTTP_STATUSES } from '../../../utils/constants';
import { sendFailedResponse, sendSuccessResponse } from '../../../utils/responseHelpers';

function getOrder(req, res) {
  const { order } = req;
  return sendSuccessResponse(res, 'Order details fetched', order);
}

export default getOrder;
