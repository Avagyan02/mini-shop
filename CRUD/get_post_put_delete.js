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
  Category.find({_id: req.params.id}, {__v: 0})
  .then(result =>{
    res.status(200).json({
      "success": true,
      "message": "Category details fetched",
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
})  


app.get('/category', (req,res) => {
  if(req.query.pageNo === '1'){
    Category.find({}, {__v: 0}).limit(Number(req.query.limit))
    .then(result => {
      res.status(200).json({
        "success": true,
        "message": "Category list fetched",
        data: result  
      })
    })
  }else{  
    const pageNo = Number(req.query.pageNo * 10 - 10);
    Category.find({}, {__v: 0}).skip(pageNo).limit(Number(req.query.limit))
    .then(result => {
      res.status(200).json({
        "success": true,
        "message": "Category list fetched",
        data: [result]
      })  
    })
    .catch(err => {
      res.send('Not enough elements');
    })
  }
})