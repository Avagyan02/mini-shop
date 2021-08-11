const jwt = require('jsonwebtoken');
const HTTP_STATUS_CODE = require('../utils/constants');
const {sendFailedResponse} = require('../utils/responseHelpers');
const {secret} = require('../api/auth/token/config');
const User = require('../models/user');

function authorizeUser(req,res,next){
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1]; 
    if(!token){
      return sendFailedResponse(res, 'Not valid token', HTTP_STATUS_CODE.NOT_AUTHORIZED);
    }else{
      jwt.verify(token, secret, (err, user) => {
        if(err) {
          return sendFailedResponse(res, 'Not valid token', HTTP_STATUS_CODE.NOT_AUTHORIZED);
        }
        User.findOne(user._id)
          .then(() => {
            req.user = user;
            next();
          })
          .catch(() => sendFailedResponse(res, 'No registered user', HTTP_STATUS_CODE.NOT_AUTHORIZED));
      })
    }
  }else{
    return sendFailedResponse(res, 'User is not logged in', HTTP_STATUS_CODE.NOT_AUTHORIZED);
  }
}

module.exports = authorizeUser;