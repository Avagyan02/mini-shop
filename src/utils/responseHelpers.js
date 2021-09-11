const { HTTP_STATUS_CODE } = require('./constants');

function sendSuccessResponse(res, message, result = null) {
  res.status(HTTP_STATUS_CODE.SUCCESS).json({
    success: true,
    message,
    data: result,
  });
}

function sendFailedResponse(res, message, status = HTTP_STATUS_CODE.BAD_REQUEST) {
  res.status(status).json({
    success: false,
    message,
    data: null,
  });
}

function sendErrorResponse(err, res) {
  console.log(err);
  res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: 'INTERNAL_SERVER_ERROR',
    data: null,
  });
}

module.exports = {
  sendSuccessResponse,
  sendFailedResponse,
  sendErrorResponse,
};
