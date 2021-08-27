const Category = require('../../../models/category');
const {sendSuccessResponse, sendErrorResponse, sendFailedResponse} = require('../../../utils/responseHelpers');
const {HTTP_STATUS_CODE} = require('../../../utils/constants');

function readMany(req,res) {
  Category
  .countDocuments()
  .then(categoryCount => {
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo; 
    if(!categoryCount){
      return sendSuccessResponse(res, 'Category list fetched', {
        count: categoryCount,
        pageCount: 1,
        list: []
      });
    }

    const pageCount = Math.ceil(categoryCount / limit);
    if(pageNo <= pageCount){
      Category
        .find({}, {__v: 0}).skip(limit * (pageNo - 1)).limit(limit)
        .then(result => sendSuccessResponse(res, 'Category list fetched', {
          count: categoryCount,
          pageCount: pageCount,
          list: result 
        }))
        .catch(err => sendErrorResponse(err, res));
    }else{
      sendFailedResponse(res, 'It is not possible to split into so many elements');
    }
  })
  .catch(err => sendErrorResponse(err, res))
}

module.exports = readMany;