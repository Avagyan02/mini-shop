const express = require('express');
const create = require('./services/post');
const readMany = require('./services/get_many');
const update = require('./services/put');
const delCat = require('./services/delete');
const read = require('./services/get_one');
const validate = require('./validations/validate_category');
const search = require('./validations/find_category');
const regexpId = require('../../middlewares/veritable_id');
const validateCategoryList = require('./validations/validate_category_list');
const authorizeUser = require('../../middlewares/authorizeUser');
const router = express.Router();

router
  .route('/')
  .post(authorizeUser,validate,create)
  .get(validateCategoryList,readMany);

router
  .route('/:id')
  .put(authorizeUser,regexpId,search,validate,update)
  .delete(authorizeUser,regexpId,search,delCat)
  .get(regexpId,search,read);

 module.exports = router;
