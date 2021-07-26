const app = require('../../app');
const Category = require('../../models/category');
const connect = require('../../mongodb');

function read(req,res) {
  Category.findOne({_id: req.params.id}).exec((err,cat) => {
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
        "data": cat 
      })
    }
  }) 
} 

module.exports = read;