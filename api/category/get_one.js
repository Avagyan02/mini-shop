const app = require('../../app');
const Category = require('../../models/category');
const connect = require('../../mongodb');
const sendSuccesResponse = require('../../helpers');

function read(req,res) {
  Category.findOne({_id: req.params.id})
    .then(result => sendSuccesResponse(res, 200, true, 'Category details fetched', result))
    .catch(() => sendSuccesResponse(res, 500));
} 

module.exports = read;