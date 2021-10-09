import jwt from 'jsonwebtoken';
import User from '../models/user';
import { HTTP_STATUSES, USER_ROLES } from '../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../utils/responseHelpers';
import secret from '../api/auth/token/config';

function authorizeFactory(acceptedRoles) {
  return async (req, res, next) => {
    try {
      let id;
      let role;
      if (req.headers.authorization) {
        const auth = req.headers.authorization.split(' ');
        if (auth[0] === 'Bearer' && auth[1]) {
          const token = auth[1];

          jwt.verify(token, secret.key, (err, payload) => {
            if (err) {
              return sendFailedResponse(res, HTTP_STATUSES.NOT_AUTHORIZED.message, HTTP_STATUSES.NOT_AUTHORIZED.code);
            }
            id = payload.id;
            role = payload.role;
          });
        }

        if (!acceptedRoles.length || acceptedRoles.includes(role)) {
          const user = await User.findOne({ _id: id });
          if (!user) {
            return sendFailedResponse(res, HTTP_STATUSES.NOT_AUTHORIZED.message, HTTP_STATUSES.NOT_AUTHORIZED.code);
          }
          req.role = user.role;
          req.user = user;
          return next();
        } else {
          return sendFailedResponse(res, HTTP_STATUSES.FORBIDDEN.message, HTTP_STATUSES.FORBIDDEN.code);
        }
      } else if (!acceptedRoles.length) {
        next();
      } else {
        return sendFailedResponse(res, HTTP_STATUSES.FORBIDDEN.message, HTTP_STATUSES.FORBIDDEN.code);
      }
    } catch (error) {
      sendErrorResponse(error, res);
    }
  };
}

export const authorizeAdmin = authorizeFactory([USER_ROLES.admin]);
export const authorizeUser = authorizeFactory([USER_ROLES.admin, USER_ROLES.user]);
export const authorizeGuestOrUser = authorizeFactory([]);
