const express = require('express');
const router = express.Router();
const create = require('./services/login');
const authorizeUser = require('../../middlewares/authorizeUser');
const validate = require('./validations/login_validation');

router
  .route('/login')
  .post(authorizeUser,validate,create);

module.exports = router;