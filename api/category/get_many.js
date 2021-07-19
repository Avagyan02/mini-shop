const app = require('../../app');
const Category = require('../../models/category');
const connect = require('../../mongodb');

function readMany(req,res) {
  Category
  .find({}).count()
  .then(result_1 => { 
    if(!(result_1 % Number(req.query.limit)) && req.query.pageNo === '1'){
      Category
     .find({}, {__v: 0}).limit(Number(req.query.limit))
     .then(result_2 => {
      res.status(200).json({
        "success": true,
        "message": "Category list fetched",
        data: [result_2],
      })
    })
    .catch(err => {
      res.send('Not enough elements');  
    })  
  }else if((!(result_1 % Number(req.query.limit)) && req.query.pageNo > '1')){
    Category
      .find({}, {__v: 0}).skip(Number(req.query.limit) * (Number(req.query.pageNo) - 1)).limit(Number(req.query.limit))
      .then(result_3 => {
        res.status(200).json({
          "success": true,
          "message": "Category list fetched",
          data: [result_3]
        })  
      })
      .catch(err => {
        res.send('Not enough elements');
        console.log('No');
      })
    }
    })
}

module.exports = readMany;