const express = require('express');
const router = express.Router();
const create = require('./services/login');
const validate = require('./validations/login_validation');

router
  .route('/login')
  .post(validate,create);

module.exports = router;