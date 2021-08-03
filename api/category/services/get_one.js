const Category = require('../../../models/category');
const {sendSuccessResponse,sendCustomResponse} = require('../../../helpers');

function read(req,res) {
  Category.findOne({_id: req.params.id})
    .then(result => sendSuccessResponse(res, "Category details fetched", result))
    .catch(err => sendCustomResponse(res,err));
} 

module.exports = read;