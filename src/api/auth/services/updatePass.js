import bcrypt from 'bcrypt';
import Users from '../../../models/user';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function updatePass(req, res) {
  try {
    const user = await Users.findOne({ email: req.body.email, restoreCode: req.body.code });
    if (user) {
      await Users.updateOne({ _id: user._id }, { $set: { password: bcrypt.hashSync(req.body.password, 10) } });
      sendSuccessResponse(res, 'Password updated');
    } else {
      sendFailedResponse(res, 'Wrong email or code');
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}
export default updatePass;
