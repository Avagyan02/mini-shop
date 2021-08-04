const HTTP_STATUS_CODE = require('../../../utils/constants');
const Category = require('../../../models/category');
const {sendFailedResponse,sendErrorResponse} = require('../../../utils/responseHelpers')


function searchCategory(req,res,next){
  Category.findOne({_id: req.params.id})
    .then(data => {
      if(!data){
        return sendFailedResponse(res, 'Not Found', HTTP_STATUS_CODE.NOT_FOUND);
      }
      return next();
    })
    .catch(err => sendErrorResponse(err, res))
}

module.exports = searchCategory;