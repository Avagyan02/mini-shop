import jwt from 'jsonwebtoken';
import User from '../models/user';
import { HTTP_STATUSES } from '../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../utils/responseHelpers';
import secret from '../api/auth/token/config';

async function authorize(req, res, next) {
  try {
    let id;
    let role;

    if (req.headers.authorization) {
      const auth = req.headers.authorization.split(' ');
      if (auth[0] === 'Bearer' && auth[1]) {
        const token = auth[1];

        jwt.verify(token, secret.key, (err, payload) => {
          if (err) {
            return sendFailedResponse(res, HTTP_STATUSES.BAD_REQUEST.message, HTTP_STATUSES.BAD_REQUEST.code);
          } else {
            id = payload.id;
            role = payload.role;
          }
        });

        const user = await User.findOne({ _id: id, role });
        if (!user) {
          return sendFailedResponse(res, HTTP_STATUSES.BAD_REQUEST.message, HTTP_STATUSES.BAD_REQUEST.code);
        }
        req.user = user;
        next();
      } else {
        return sendFailedResponse(res, HTTP_STATUSES.BAD_REQUEST.message, HTTP_STATUSES.BAD_REQUEST.code);
      }
    } else {
      next();
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default authorize;
