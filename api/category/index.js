const express = require('express');
const create = require('./services/post');
const readMany = require('./services/get_many');
const update = require('./services/put');
const delCat = require('./services/delete');
const read = require('./services/get_one');
const validate = require('../../middlewares/validate_category');
const search = require('../../middlewares/search');
const regexpId = require('../../middlewares/veritable_id');
const validateCategoryList = require('../../middlewares/validate_category_list');
let router = express.Router();

router
  .route('/')
  .post(validate,create)
  .get(validateCategoryList,readMany);

router
  .route('/:id')
  .put(regexpId,search,validate,update)
  .delete(regexpId,search,delCat)
  .get(regexpId,search,read);

 module.exports = router;
