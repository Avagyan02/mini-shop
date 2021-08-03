//const Joi = require('joi');
const constStatus = require('../constants/constants');
const Category = require('../models/category');
const {sendFailedResponse} = require('../helpers')


function searchCategory(req,res,next){
  Category.findOne({_id: req.params.id})
    .then(() => next())
    .catch(err => sendFailedResponse(res, 'Not found', constStatus.STATUS_CODE_NOT_FOUND))
}

module.exports = searchCategory;