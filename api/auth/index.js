const express = require('express');
const router = express.Router();
const create = require('./services/login');
const validate = require('./validations/user_validation');
const register = require('./services/register');
const registerValidate = require('./validations/register_validation');
const fullRegister = require('./services/full_registration');

router
  .post('/login', validate, create);

router
  .post('/register', validate, register);

router
  .post('/verify', registerValidate, fullRegister);

module.exports = router;
