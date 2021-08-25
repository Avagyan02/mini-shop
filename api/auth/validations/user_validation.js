const {sendFailedResponse} = require('../../../utils/responseHelpers');
const Joi = require('joi');

function userValidate(req, res, next){
  const joiSchema = Joi.object().keys({
    name: Joi.string().trim().required(),
    surname: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
    telephone: Joi.number().integer()
  })

  const {error} = joiSchema.validate(req.body);
  if(error){
    return sendFailedResponse(res, error);
  }
  next();
}

module.exports = userValidate;