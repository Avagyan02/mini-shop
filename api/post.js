const app = require('../app');
const Category = require('../models/category');
const connect = require('../mongodb');

function create(req,res){
  Category
    .create({nameEn: req.body.nameEn, nameRu: req.body.nameRu, nameHy: req.body.nameHy})
    .then( () => {
      console.log('Category saved');
      res.status(200).json({
        "success": true,
        "message": "Category created",
        "data": {
          nameEn: req.body.nameEn,
          nameRu: req.body.nameRu,
          nameHy: req.body.nameHy,
          productCount: 0
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.send('Category not saved');
    })
}

module.exports = create;