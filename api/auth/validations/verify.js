const {sendFailedResponse} = require('../../../utils/responseHelpers');
const Joi = require('joi');

function verifyValidate(req, res, next){
    const joiSchema = Joi.object().keys({
      email: Joi.string().trim().email().required(),
      code: Joi.number().integer().required(),
    })
  
    const {error} = joiSchema.validate(req.body);
    if(error){
      return sendFailedResponse(res, error);
    }
    next();
  }
  
  module.exports = verifyValidate;