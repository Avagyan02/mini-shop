const {sendFailedResponse} = require('../../../utils/responseHelpers');
const Joi = require('joi');

function registerValidate(req, res, next){
    const joiSchema = Joi.object().keys({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
      code: Joi.string().trim().required(),
    })
  
    const {error} = joiSchema.validate(req.body);
    if(error){
      return sendFailedResponse(res, error);
    }
    next();
  }
  
  module.exports = registerValidate;