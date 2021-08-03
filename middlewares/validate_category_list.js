const Joi = require('joi');
const {sendCustomResponse} = require('../helpers');
const constStatus = require('../constants/constants');

function validateCategoryList(req,res,next){
  const joiSchema = Joi.object().keys({
    limit : Joi.number().max(150).required(),
    pageNo : Joi.number().max(150).required(),  
  })
  
  const {error} = joiSchema.validate(req.query);
  if(error){
    return sendCustomResponse(res, error, constStatus.STATUS_CODE_FAILE);
  }
  next();
}

module.exports = validateCategoryList; 