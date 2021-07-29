const app = require('../../app');
const Category = require('../../models/category');
const connect = require('../../mongodb');
const sendSuccesResponse = require('../../helpers');

function update(req,res){
    Category
    .findOneAndUpdate({_id: req.params.id},{  
      $set: {
      nameEn: req.body.nameEn, 
      nameRu: req.body.nameRu, 
      nameHy: req.body.nameHy,
      }
    })
    .then(result => sendSuccesResponse(res, 200, true, 'Category updated', result))
    .catch(() => sendSuccesResponse(res))
}

module.exports = update;