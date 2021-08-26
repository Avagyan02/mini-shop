const express = require('express');
const router = express.Router();
const create = require('./services/login');
const validate = require('./validations/user_validation');
const register = require('./services/register');
const registerValidate = require('./validations/register_validate');
const fullRegister = require('./services/full_registration');

router
  .route('/login')
  .post(validate,create);

router
  .route('/register')
  .post(validate,register);

router
  .route('/register/full')
  .post(registerValidate,fullRegister)

module.exports = router;
