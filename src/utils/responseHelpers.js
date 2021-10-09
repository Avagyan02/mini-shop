import { HTTP_STATUSES } from './constants';

export function sendSuccessResponse(res, message, result = null) {
  res.status(HTTP_STATUSES.SUCCESS.code).json({
    success: true,
    message,
    data: result,
  });
}

export function sendFailedResponse(res, message = HTTP_STATUSES.BAD_REQUEST.message, code = HTTP_STATUSES.BAD_REQUEST.code) {
  res.status(code).json({
    success: false,
    message,
    data: null,
  });
}

export function sendErrorResponse(err, res) {
  console.log(err);
  res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR.code).send({
    success: false,
    message: HTTP_STATUSES.INTERNAL_SERVER_ERROR.message,
    data: null,
  });
}
