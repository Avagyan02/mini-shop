const express = require('express');
const router = express.Router();
const create = require('./services/post');
const validate = require('./validations/user_validation');

router
  .route('/user')
  .post(validate,create);

module.exports = router;