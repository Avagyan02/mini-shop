const app = require('../app');
const Category = require('../models/category');
const connect = require('../mongodb');

function read(req,res) {
  Category
  .find({_id: req.params.id}, {__v: 0})
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
}

module.exports = read;