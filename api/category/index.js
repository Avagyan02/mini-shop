const express = require('express');
const create = require('./post');
const readMany = require('./get_many');
const update = require('./put');
const delCat = require('./delete');
const read = require('./get_one');
const app = require('../../app');
let router = express.Router();
console.log(create);
router
  .route('/category')
  .post(create)
  .get(readMany);

router
  .route('/category/:id')
  .put(update)
  .delete(delCat)
  .get(read);

module.exports = router.route;
