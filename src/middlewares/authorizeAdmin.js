import jwt from 'jsonwebtoken';
import User from '../models/user';
import { HTTP_STATUSES } from '../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../utils/responseHelpers';
import secret from '../api/auth/token/config';

async function authorizeAdmin(req, res, next) {
  try {
    const message = 'Not valid token';
    let id;
    let role;

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
        role = payload.role;
      });

      if (role !== 1) {
        return sendFailedResponse(res, HTTP_STATUSES.FORBIDDEN.message, HTTP_STATUSES.FORBIDDEN.code);
      }
      const admin = await User.findOne({ _id: id });
      if (!admin) {
        return sendFailedResponse(res, HTTP_STATUSES.NOT_AUTHORIZED.message, HTTP_STATUSES.NOT_AUTHORIZED.code);
      }
      next();
    } else {
      sendFailedResponse(res, HTTP_STATUSES.NOT_AUTHORIZED.message, HTTP_STATUSES.NOT_AUTHORIZED.code);
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default authorizeAdmin;
