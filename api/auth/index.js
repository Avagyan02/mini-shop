const express = require('express');
const router = express.Router();
const create = require('./services/login');
const authorizeUser = require('../../middlewares/authorizeUser');
const validate = require('./validations/user_validation');
const register = require('./services/register');
const mailer = require('./validations/send_message');

router
  .route('/login')
  .post(authorizeUser,validate,create);

router
  .route('/register')
  .post(validate,register,mailer);

module.exports = router;
