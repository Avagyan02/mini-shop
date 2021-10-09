import bcrypt from 'bcrypt';
import Users from '../../../models/user';
import generateUserToken from '../token/JWT';
import { HTTP_STATUSES } from '../../../utils/constants';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function createUser(req, res) {
  try {
    const message = 'Incorrect email or password';
    const user = await Users.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      console.log(1);
      if (user.verified) {
        console.log(2);
        const pass = bcrypt.compareSync(req.body.password, user.password);
        if (pass) {
          console.log(3);
          sendSuccessResponse(res, 'Logged in', generateUserToken(user._id, user.role));
        } else {
          console.log(4);
          sendFailedResponse(res);
        }
      } else {
        console.log(5);
        sendFailedResponse(res, message);
      }
    } else {
      console.log(6);
      sendFailedResponse(res, message);
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default createUser;
