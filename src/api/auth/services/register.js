import bcrypt from 'bcrypt';
import Users from '../../../models/user';
import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';
import getRandomCode from '../../../utils/get_code';
import mailer from '../../../utils/send_message';
import { USER_ROLES } from '../../../utils/constants';

async function register(req, res) {
  try {
    const code = getRandomCode('0123456789', 5);
    const message = {
      to: req.body.email,
      html: `<h1>You registered</h1>
            <h3>To pass full verification use this code. ${code}</h3>`,
    };

    const userDetails = {
      name: req.body.name,
      surname: req.body.surname,
      password: bcrypt.hashSync(req.body.password, 10),
      telephone: req.body.telephone,
      userCode: code,
    };

    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      await Users.create(
        {
          ...userDetails,
          email: req.body.email,
          role: USER_ROLES.user,
        },
      );
      sendSuccessResponse(res, 'User created');
      mailer(message);
    } else if (!user.verified) {
      await Users.updateOne(
        { _id: user._id },
        {
          $set: userDetails,
        },
      );
      sendSuccessResponse(res, 'User updated');
      mailer(message);
    } else {
      sendFailedResponse(res, 'User verified');
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default register;
