const app = require('./app');
const Category = require('./models/category');
const connect = require('./mongodb');
const constStatus = require('./constants/constants');

function sendSuccessResponse(res, message, result, success = true) {
  res.status(constStatus.STATUS_CODE_SUCCESS).json({
    "success": success,
    "message": message,
    "data": result
  })  
}

function sendFailedResponse(res, message, status = constStatus.STATUS_CODE_FAILE, result = null, succes = false){
  res.status(status).json({
    "success": succes,
    "message": message,
    "data": result  
  })
}

function sendCustomResponse(res, result, status = constStatus.STATUS_CODE_ERROR){
  res.status(status).send(result);
}

module.exports = { 
  sendSuccessResponse,
  sendFailedResponse,
  sendCustomResponse
};