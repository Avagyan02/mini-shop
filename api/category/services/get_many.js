const Category = require('../../../models/category');
const {sendSuccessResponse, sendErrorResponse, sendFailedResponse} = require('../../../utils/responseHelpers');

function readMany(req,res) {
  Category
  .find({}).count()
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
        .find({}, {__v: 0}).skip(Number(req.query.limit) * (Number(req.query.pageNo) - 1)).limit(Number(req.query.limit))
        .then(result => sendSuccessResponse(res, 'Category list fetched', {
          count: categoryCount,
          pageCount: 1,
          list: result 
        }))
        .catch(err => sendErrorResponse(res,err));
    }else{
      sendFailedResponse(res, 'It is not possible to split into so many elements');
    }
  })
}

module.exports = readMany;