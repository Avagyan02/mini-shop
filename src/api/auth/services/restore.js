import Users from '../../../models/user';
import getRandomCode from '../../../utils/get_code';
import mailer from '../../../utils/send_message';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function restore(req, res) {
  try {
    const code = getRandomCode('0123456789', 5);
    const message = {
      to: req.body.email,
      html: `<h1>Update password</h1>
            <h3>Use this code to update your password. ${code}</h3>`,
    };
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      if (user.verified) {
        await Users.updateOne({ _id: user._id }, { $set: { restoreCode: code } });
        sendSuccessResponse(res, 'Message send');
        mailer(message);
      } else {
        sendFailedResponse(res, 'Go through full verification');
      }
    } else {
      sendFailedResponse(res, 'Wrong email');
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default restore;
