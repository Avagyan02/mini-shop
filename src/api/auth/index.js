const express = require('express');

const router = express.Router();
const loginValidate = require('./validations/login');
const login = require('./services/login');
const registerValidate = require('./validations/register');
const register = require('./services/register');
const verifyValidate = require('./validations/verify');
const verify = require('./services/verify');
const validateRestore = require('./validations/restore');
const restore = require('./services/restore');
const validateUpdatePass = require('./validations/updatePass');
const updatePass = require('./services/updatePass');

router
  .post('/login', loginValidate, login);

router
  .post('/register', registerValidate, register);

router
  .post('/verify', verifyValidate, verify);

router
  .post('/restore', validateRestore, restore);

router
  .post('/restore/verify', validateUpdatePass, updatePass);

module.exports = router;
