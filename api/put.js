const app = require('../app');
const Category = require('../models/category');
const connect = require('../mongodb');

function update(req,res){
  Category
  .findOneAndUpdate({_id: req.params.id},{  
      $set: {
      nameEn: req.body.nameEn, 
      nameRu: req.body.nameRu, 
      nameHy: req.body.nameHy,
      }
  })
  .then(() =>  {
      res.status(200).json({
      "success": true,
      "message": "Category updated",
      "data": {
          _id: req.params.id,
          nameEn: req.body.nameEn,
          nameRu: req.body.nameRu,
          nameHy: req.body.nameHy,
          productCount: 0
      }
      })
  })
  .catch(() => {
      res.status(404).json({
      "success": false,
      "message": "Not found",
      "data": null
      })
  })
}

module.exports = update;