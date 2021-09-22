import Users from '../../../models/user';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function verifyUser(req, res) {
  try {
    const user = await Users.findOne({ email: req.body.email, verified: false, userCode: req.body.code });
    if (user) {
      await Users.updateOne({ _id: user._id }, { $set: { verified: true } });
      sendSuccessResponse(res, 'User verified');
    } else {
      sendFailedResponse(res, 'Wrong data');
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default verifyUser;
