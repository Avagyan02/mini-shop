const app = require('../../app');
const Category = require('../../models/category');
const connect = require('../../mongodb');
const sendSuccesResponses = require('../../helpers');
const {categoryValidation} =  require('../../validations/category_validate');

function create(req,res){
  Category
    .create({nameEn: req.body.nameEn, nameRu: req.body.nameRu, nameHy: req.body.nameHy})
    .then(result => sendSuccesResponses(res, 200, true, 'Category created', result))
    .catch(err => sendSuccesResponses(res));
}

module.exports = create;