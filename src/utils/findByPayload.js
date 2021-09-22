import User from '../models/user';
import { sendErrorResponse, sendFailedResponse } from './responseHelpers';
import { HTTP_STATUS_CODE } from './constants';

async function findByPayload(req, res, next, id) {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return sendFailedResponse(res, 'No registered user', HTTP_STATUS_CODE.NOT_AUTHORIZED);
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default findByPayload;
