const {sendFailedResponse} = require('../../../utils/responseHelpers');

function userValidate(req, res, next){
  const email = req.body.email;
  const regexpEmail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const password = req.body.password;
  const regexpPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if(regexpEmail.test(email) && regexpPassword.test(password)){
    return next();
  }else if(!(regexpEmail.test(email))){
    return sendFailedResponse(res, 'Not valid email');
  }else if(!(regexpPassword.test(password))){
    return sendFailedResponse(res, 'The password must contain at least eight characters, at least one letter and one number')
  }
}

module.exports = userValidate;