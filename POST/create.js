const connect = require('../moduls/connect');
const app = require('../moduls/express');
const Category = require('../models/schema');

let newCat = {};

app.post('/category', create);

function create(req,res){
  Category
    .create({nameEn: req.body.nameEn, nameRu: req.body.nameRu, nameHy: req.body.nameHy})
    .then( category => {
      console.log('Category saved');
      newCat.new = {nameEn: req.body.nameEn, nameRu: req.body.nameRu, nameHy: req.body.nameHy}
      res.json({
        "success": true,
        "message": "Category created",
        "data": newCat.new
      })
    })
    .catch(err => {
      console.log(err);
      res.send('Category not saved');
    })
}