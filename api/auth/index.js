const express = require('express');
const router = express.Router();
const loginValidate = require('./validations/login');
const login = require('./services/login');
const registerValidate = require('./validations/register');
const register = require('./services/register');
const verifyValidate = require('./validations/verify');
const verify = require('./services/verify');

router
  .post('/login', loginValidate, login);

router
  .post('/register', registerValidate, register);

router
  .post('/verify', verifyValidate, verify);

module.exports = router;
