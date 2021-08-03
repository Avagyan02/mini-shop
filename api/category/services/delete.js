const Category = require('../../../models/category');
const {sendSuccessResponse,sendCustomResponse} = require('../../../helpers');

function delCat(req,res){
  Category
    .findOneAndDelete({_id: req.params.id})
    .then(() => sendSuccessResponse(res,"Category deleted",null))
    .catch(err => sendCustomResponse(res,err));
}

module.exports = delCat;