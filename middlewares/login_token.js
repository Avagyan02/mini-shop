const jwt = require('jsonwebtoken');
const HTTP_STATUS_CODE = require('../utils/constants');
const {sendFailedResponse} = require('../utils/responseHelpers');
const {secret} = require('../api/auth/token/config');

function loginToken(req,res,next){
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1]; 
    if(!token){
      return sendFailedResponse(res, 'Not valid token', HTTP_STATUS_CODE.FORBIDDEN);
    }else{
      jwt.verify(token, secret, (err, user) => {
        if(err) {
          return sendFailedResponse(res, 'Not valid token', HTTP_STATUS_CODE.FORBIDDEN);
        }
        req.user = user;
        console.log(user);
        next();
      })
    }
  }else{
    return sendFailedResponse(res, 'User is not logged in', HTTP_STATUS_CODE.NOT_AUTHORIZED);
  }
}

module.exports = loginToken;