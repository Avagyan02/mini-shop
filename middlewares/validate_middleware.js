const {categoryValidation} = require('../validations/category_validate');

function validateCategory(req,res,next){
  const {error} = categoryValidation(req.body);
  if(error){
   return res.status(400).send('Not correct values');
  }
  next();
}

module.exports = validateCategory;