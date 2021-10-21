import Users from '../../../models/user';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function verifyUser(req, res) {
  try {
    const user = await Users.findOne({ email: req.body.email, verified: false, userCode: req.body.code });
    if (user) {
      user.verfied = true;
      await user.save();
      return sendSuccessResponse(res, 'User verified');
    }
    return sendFailedResponse(res, 'Wrong data');
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default verifyUser;
