const {sendFailedResponse} = require('../../../utils/responseHelpers');
const Joi = require('joi');

function loginValidate(req, res, next){
  const joiSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required()
  })

  const {error} = joiSchema.validate(req.body);
  if(error){
    return sendFailedResponse(res, error);
  }
  next();
}

module.exports = loginValidate;