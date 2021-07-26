const app = require('../../app');
const Category = require('../../models/category');
const connect = require('../../mongodb');
const result = require('../../helpers');
const {categoryValidation} =  require('../../validations/category_validate');

function create(req,res){
  const {error} = categoryValidation(req.body)
  if(!error){
    Category
      .create({nameEn: req.body.nameEn, nameRu: req.body.nameRu, nameHy: req.body.nameHy})
      .then(result => {
        console.log('Category saved');
        res.status(200).json({
          "success": true,
          "message": "Category created",
          "data": result
        })
      })
      .catch(err => {
        res.send(err);s
      })
  }else{
    res.send('Not correct values');
  }
}

module.exports = create;