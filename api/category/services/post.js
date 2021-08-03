const Category = require('../../../models/category');
const {sendCustomResponse, sendSuccessResponse} = require('../../../helpers');

function create(req,res){
  Category
    .create({nameEn: req.body.nameEn, nameRu: req.body.nameRu, nameHy: req.body.nameHy})
    .then(result => sendSuccessResponse(res, 'Category created', result))
    .catch(err => sendCustomResponse(res, err));
}

module.exports = create;