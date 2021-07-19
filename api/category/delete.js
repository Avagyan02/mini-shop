const app = require('../../app');
const Category = require('../../models/category');
const connect = require('../../mongodb');

function delCat(req,res){
  Category
  .findOneAndDelete({_id: req.params.id})
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
}

module.exports = delCat;