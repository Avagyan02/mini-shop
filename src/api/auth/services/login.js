import bcrypt from 'bcrypt';
import Users from '../../../models/user';
import generateUserToken from '../token/JWT';
import { HTTP_STATUSES } from '../../../utils/constants';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function createUser(req, res) {
  try {
    const message = 'Incorrect email or password';
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      if (user.verified) {
        const pass = bcrypt.compareSync(req.body.password, user.password);
        if (pass) {
          sendSuccessResponse(res, 'Logged in', generateUserToken(user._id, user.role));
        } else {
          sendFailedResponse(res);
        }
      } else {
        sendFailedResponse(res, message);
      }
    } else {
      sendFailedResponse(res, message);
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default createUser;
