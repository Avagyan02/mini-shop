import Users from '../../../models/user';
import getRandomCode from '../../../utils/getCode';
import mailer from '../../../utils/sendMessage';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function restore(req, res) {
  try {
    const code = getRandomCode('0123456789', 5);
    const wrongEmailMessage = 'Wrong email';
    const message = {
      to: req.body.email,
      html: `<h1>Update password</h1>
            <h3>Use this code to update your password. ${code}</h3>`,
    };
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      if (user.verified) {
        user.restoreCode = code;
        await user.save();
        sendSuccessResponse(res, 'Message send');
        mailer(message);
      } else {
        sendFailedResponse(res, wrongEmailMessage);
      }
    } else {
      sendFailedResponse(res, wrongEmailMessage);
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default restore;
