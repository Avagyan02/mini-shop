import jwt from 'jsonwebtoken';
import User from '../models/user';
import { HTTP_STATUSES } from '../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../utils/responseHelpers';
import secret from '../api/auth/token/config';

function checkToken(req, res) {
  if (req.headers.authorization) {
    const auth = req.headers.authorization.split(' ');
    console.log(auth);
    if (auth[0] === 'Bearer' && auth[1]) {
      const token = auth[1];

      jwt.verify(token, secret.key, (err, payload) => {
        if (err) {
          return sendFailedResponse(res, HTTP_STATUSES.BAD_REQUEST.message);
        }
        const userParams = [payload.id, payload.role];
        console.log(userParams);
        // userParams.push(payload.id, payload.role);
        return { role: payload.role, id: payload.id };
      });
    } else {
      return sendFailedResponse(res, HTTP_STATUSES.BAD_REQUEST.message);
    }
  } else {
    return sendFailedResponse(res, HTTP_STATUSES.BAD_REQUEST.message);
  }
}
function authorize(req, res, next) {
  const params = checkToken(req, res);
  console.log(params);
  if (typeof params === 'object' && params.role === 1) {
    return async function () {
      try {
        //  const user = checkToken(req, res);

        // if (user[1] !== 1) {
        //   return sendFailedResponse(res, HTTP_STATUSES.FORBIDDEN.message);
        // }
        const admin = await User.findOne({ _id: params.id, role: params.role });
        if (!admin) {
          return sendFailedResponse(res, HTTP_STATUSES.BAD_REQUEST.message);
        }
        req.user = admin;
        next();
      } catch (error) {
        sendErrorResponse(error, res);
      }
    };
  } else if (Array.isArray(params) && params[1] === 2) {
    return async function () {
      try {
        const user = checkToken(req, res);
        console.log(user);

        const findUser = await User.findOne({ _id: params.id, role: params.role });
        if (!findUser) {
          return sendFailedResponse(res, HTTP_STATUSES.BAD_REQUEST.message);
        }
        req.user = findUser;
        next();
      } catch (error) {
        sendErrorResponse(error, res);
      }
    };
  } else {
    console.log(params);
    return sendFailedResponse(res, HTTP_STATUSES.BAD_REQUEST.message);
  }
}

export default authorize;
