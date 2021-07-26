const app = require('./app');
const Category = require('./models/category');
const connect = require('./mongodb');

function succsesCreate(res) {
  console.log('Category saved');
  res.status(200).json({
    "success": true,
    "message": "Category created",
    "data": succsesCreate
  })  
}

module.exports = succsesCreate;