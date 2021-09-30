import { HTTP_STATUSES } from './constants';

export function sendSuccessResponse(res, message, result = null) {
  res.status(HTTP_STATUSES.SUCCESS.code).json({
    success: true,
    message,
    data: result,
  });
}

export function sendFailedResponse(res, status = HTTP_STATUSES.BAD_REQUEST) {
  res.status(status.code).json({
    success: false,
    message: status.message,
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
