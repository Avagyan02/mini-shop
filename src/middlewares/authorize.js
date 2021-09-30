import jwt from 'jsonwebtoken';
import User from '../models/user';
import { HTTP_STATUSES, USER_ROLES } from '../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../utils/responseHelpers';
import secret from '../api/auth/token/config';

function authorizeFactory(acceptedRoles) {
  let id;
  let role;
  return async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        const auth = req.headers.authorization.split(' ');
        if (auth[0] === 'Bearer' && auth[1]) {
          const token = auth[1];

          jwt.verify(token, secret.key, (err, payload) => {
            if (err) {
              return sendFailedResponse(res, HTTP_STATUSES.NOT_AUTHORIZED);
            }
            id = payload.id;
            role = payload.role;
          });
        }

        if (!acceptedRoles.length || acceptedRoles.length >= 1 && acceptedRoles.includes(role)) {
          const user = await User.findOne({ _id: id });
          console.log(user);
          if (!user) {
            return sendFailedResponse(res, HTTP_STATUSES.FORBIDDEN);
          }
          req.user = user;
          next();
        } else {
          return sendFailedResponse(res, HTTP_STATUSES.NOT_AUTHORIZED);
        }
      } else if (!acceptedRoles.length && !req.headers.authorization) {
        next();
      } else {
        return sendFailedResponse(res, HTTP_STATUSES.NOT_AUTHORIZED);
      }
    } catch (error) {
      sendErrorResponse(error, res);
    }
  };
}

export const authorizeAdmin = authorizeFactory([USER_ROLES.admin]);
export const authorizeUser = authorizeFactory([USER_ROLES.admin, USER_ROLES.user]);
export const authorizeGuestOrUser = authorizeFactory([]);
