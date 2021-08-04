const Category = require('../../../models/category');
const {sendSuccessResponse, sendErrorResponse} = require('../../../utils/responseHelpers');

function delCat(req,res){
  Category
    .findOneAndDelete({_id: req.params.id})
    .then(() => sendSuccessResponse(res,"Category deleted",null))
    .catch(err => sendErrorResponse(res,err));
}

module.exports = delCat;