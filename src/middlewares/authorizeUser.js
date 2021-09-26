import jwt from 'jsonwebtoken';
import User from '../models/user';
import { HTTP_STATUS_CODE } from '../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../utils/responseHelpers';
import secret from '../api/auth/token/config';

async function authorizeUser(req, res, next) {
  try {
    const message = 'Not valid token';
    let id;

    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return sendFailedResponse(res, message, HTTP_STATUS_CODE.NOT_AUTHORIZED);
      }
      jwt.verify(token, secret.key, (err, payload) => {
        if (err) {
          console.log(payload, token, secret, err);
          return sendFailedResponse(res, message, HTTP_STATUS_CODE.NOT_AUTHORIZED);
        } else {
          id = payload.id;
        }
      });

      const user = await User.findOne({ _id: id });
      req.user = user;
      next();
    } else {
      sendFailedResponse(res, 'User is not logged in', HTTP_STATUS_CODE.NOT_AUTHORIZED);
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default authorizeUser;
