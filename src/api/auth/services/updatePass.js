import bcrypt from 'bcrypt';
import Users from '../../../models/user';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function updatePass(req, res) {
  try {
    const user = await Users.findOne({ email: req.body.email, restoreCode: req.body.code });
    if (user) {
      user.password = bcrypt.hashSync(req.body.password, 10);
      await user.save();
      return sendSuccessResponse(res, 'Password updated');
    }
    return sendFailedResponse(res, 'Wrong email or code');
  } catch (error) {
    sendErrorResponse(error, res);
  }
}
export default updatePass;
