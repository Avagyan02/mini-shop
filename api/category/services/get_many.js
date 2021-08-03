const Category = require('../../../models/category');
const {sendCustomResponse, sendSuccessResponse} = require('../../../helpers');
const constStatus = require('../../../constants/constants');

function readMany(req,res) {
  Category
  .find({}).count()
  .then(categoryCount => { 
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;  
    if(limit * pageNo <= categoryCount){
      Category
        .find({}, {__v: 0}).skip(Number(req.query.limit) * (Number(req.query.pageNo) - 1)).limit(Number(req.query.limit))
        .then(result => sendSuccessResponse(res, 'Category list fetched', result))
        .catch(err => sendCustomResponse(res,err));
    }else{
      sendCustomResponse(res, 'It is not possible to split into so many elements', constStatus.STATUS_CODE_NOT_FOUND)
    }
  })
}

module.exports = readMany;