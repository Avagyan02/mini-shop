const app = require('../../app');
const Category = require('../../models/category');
const connect = require('../../mongodb');
const sendSuccesResponse = require('../../helpers');

function delCat(req,res){
  Category
  .findOneAndDelete({_id: req.params.id})
  .then(() => sendSuccesResponse(res, 200, true, 'Category deleted'))
  .catch(() => sendSuccesResponse(res, 500));  
}

module.exports = delCat;