import jwt from 'jsonwebtoken';
import User from '../models/user';
import { HTTP_STATUSES } from '../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../utils/responseHelpers';
import secret from '../api/auth/token/config';

async function authorizeUser(req, res, next) {
  try {
    const message = 'Not valid token';
    let id;

    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return sendFailedResponse(res, HTTP_STATUSES.NOT_AUTHORIZED.message, HTTP_STATUSES.NOT_AUTHORIZED.code);
      }
      jwt.verify(token, secret.key, (err, payload) => {
        if (err) {
          return sendFailedResponse(res, message, HTTP_STATUSES.NOT_AUTHORIZED.code);
        }
        id = payload.id;
      });

      const user = await User.findOne({ _id: id });
      if (!user) {
        return sendFailedResponse(res, HTTP_STATUSES.NOT_AUTHORIZED.message, HTTP_STATUSES.NOT_AUTHORIZED.code);
      }
      req.user = user;
      next();
    } else {
      sendFailedResponse(res, HTTP_STATUSES.NOT_AUTHORIZED.message, HTTP_STATUSES.NOT_AUTHORIZED.code);
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default authorizeUser;
