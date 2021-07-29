const express = require('express');
const create = require('./post');
const readMany = require('./get_many');
const update = require('./put');
const delCat = require('./delete');
const read = require('./get_one');
const validate = require('../../middlewares/validate_middleware');
let router = express.Router();

router
  .route('/')
  .post(validate,create)
  .get(readMany);

router
  .route('/:id')
  .put(validate,update)
  .delete(delCat)
  .get(read);

 module.exports = router;
