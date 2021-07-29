const app = require('../../app');
const Category = require('../../models/category');
const connect = require('../../mongodb');
const sendSuccesResponse = require('../../helpers');

function readMany(req,res) {
  Category
  .find({}).count()
  .then(result_1 => { 
    if(!(result_1 % Number(req.query.limit)) && req.query.pageNo === '1'){
      Category
        .find({}, {__v: 0}).limit(Number(req.query.limit))
        .then(result_2 => sendSuccesResponse(res, 200, true, 'Category list fetched', [result_2]))
        .catch(() => sendSuccesResponse(res));  
    }else if((result_1 % Number(req.query.limit) == 0) && req.query.pageNo > '1'){
      Category
        .find({}, {__v: 0}).skip(Number(req.query.limit) * (Number(req.query.pageNo) - 1)).limit(Number(req.query.limit))
        .then(result_3 => sendSuccesResponse(res, 200, true, 'Category list fetched', [result_3]))
        .catch(() => sendSuccesResponse(res));
    }else{
      res.status(500).send('It is not possible to split into so many elements');
    }
  })
}

module.exports = readMany;