const Joi = require('joi');
const {sendFailedResponse} = require('../helpers');

function validateCategory(req,res,next){
  const joiSchema = Joi.object().keys({
    nameEn: Joi.string()
      .min(2)
      .max(150)
      .required(),

    nameRu: Joi.string()
      .min(2)
      .max(150)
      .required(),

    nameHy: Joi.string()
      .min(2)
      .max(150)
      .required(),    
  })
  const {error} = joiSchema.validate(req.body);
  if(error){
    return sendFailedResponse(res, error);
  }
  next();
}

module.exports = validateCategory;