const app = require('./app');
const Category = require('./models/category');
const connect = require('./mongodb');

function sendSuccesResponse(res, code = 400, succes = false, message = 'Incorect data', result = null) {
  res.status(code).json({
    "success": succes,
    "message": message,
    "data": result
  })  
}

module.exports = sendSuccesResponse;