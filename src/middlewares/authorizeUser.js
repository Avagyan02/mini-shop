import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODE } from '../utils/constants';
import { sendFailedResponse, sendErrorResponse } from '../utils/responseHelpers';
import secret from '../api/auth/token/config';
import findByPayload from '../utils/findByPayload';

function authorizeUser(req, res, next) {
  const message = 'Not valid token';

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return sendFailedResponse(res, message, HTTP_STATUS_CODE.NOT_AUTHORIZED);
    }
    jwt.verify(token, secret.key, (err, payload) => {
      if (err) {
        console.log(payload, token, secret, err);
        return sendFailedResponse(res, message, HTTP_STATUS_CODE.NOT_AUTHORIZED);
      }
      findByPayload(req, res, next, payload.id);
    });
  } else {
    sendFailedResponse(res, 'User is not logged in', HTTP_STATUS_CODE.NOT_AUTHORIZED);
  }
}

export default authorizeUser;
