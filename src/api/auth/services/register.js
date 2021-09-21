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

    const findUser = await Users.findOne({ email: req.body.email });
    if (!findUser) {
      try {
        const user = await Users.create(
          {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            telephone: req.body.telephone,
            userCode: code,
            role: USER_ROLES.user,
          },
        );
        if (user) {
          sendSuccessResponse(res, 'User created');
          mailer(message);
        }
      } catch (error) {
        sendErrorResponse(error, res);
      }
    } else if (!findUser.verified) {
      try {
        const updateUser = await Users.updateOne(
          { _id: findUser._id },
          {
            $set: {
              name: req.body.name,
              surname: req.body.surname,
              password: bcrypt.hashSync(req.body.password, 10),
              telephone: req.body.telephone,
              userCode: code,
            },
          },
        );
        if (updateUser) {
          sendSuccessResponse(res, 'User updated');
          mailer(message);
        }
      } catch (error) {
        sendErrorResponse(error, res);
      }
    } else {
      sendFailedResponse(res, 'User verified');
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default register;
