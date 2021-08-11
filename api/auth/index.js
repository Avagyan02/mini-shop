const express = require('express');
const router = express.Router();
const create = require('./services/login');
const loginToken = require('../../middlewares/login_token');
const validate = require('./validations/login_validation');

router
  .route('/login')
  .post(loginToken,validate,create);

module.exports = router;