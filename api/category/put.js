const app = require('../../app');
const Category = require('../../models/category');
const connect = require('../../mongodb');
const {categoryValidation} =  require('../../validations/category_validate');

function update(req,res){
  const {error} = categoryValidation(req.body)
  if(!error){
    Category
    .findOneAndUpdate({_id: req.params.id},{  
      $set: {
      nameEn: req.body.nameEn, 
      nameRu: req.body.nameRu, 
      nameHy: req.body.nameHy,
      }
    })
    .then(result =>  {
      res.status(200).json({
      "success": true,
      "message": "Category updated",
      "data": result
      })
    })
    .catch(() => {
      res.status(404).json({
      "success": false,
      "message": "Not found",
      "data": null
      })
    })
  }else{
    res.send('Not correct values');
  }
}

module.exports = update;