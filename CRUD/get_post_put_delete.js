const connect = require('../moduls/connect');
const app = require('../moduls/express');
const Category = require('../models/schema');

app.post('/category', create);
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

app.put('/category/:id', (req,res) => {
  Category.findOneAndUpdate({_id: req.params.id},{  
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
})

app.delete('/category/:id', (req,res) => {
  Category.findOneAndDelete({_id: req.params.id})
  .then(() => {
    res.status(200).json({
        "success": true,
        "message": "Category deleted",
        "data": null
    })
  })
  .catch(() => {
    res.status(404).json({
      "success": false,
      "message": "Not found",
      "data": null
    })
  })
}) 

app.get('/category/:id', (req,res) => {
  Category.find({_id: req.params.id}, {__v: 0}, (err,category) => {
    if(err){
      res.status(404).json({
        "success": false,
        "message": "Not found",
        "data": null
      })
    }else{
      res.status(200).json({
        "success": true,
        "message": "Category details fetched",
        "data": category 
      })
    }
  })  
})
