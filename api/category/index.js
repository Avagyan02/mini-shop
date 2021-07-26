const express = require('express');
const create = require('./post');
const readMany = require('./get_many');
const update = require('./put');
const delCat = require('./delete');
const read = require('./get_one');
let router = express.Router();

router
  .route('/')
  .post(create)
  .get(readMany);

router
  .route('/:id')
  .put(update)
  .delete(delCat)
  .get(read);

 module.exports = router;
