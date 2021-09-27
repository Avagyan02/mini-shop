import express from 'express';
import loginValidate from './validations/login';
import login from './services/login';
import registerValidate from './validations/register';
import register from './services/register';
import verifyValidate from './validations/verify';
import verify from './services/verify';
import validateRestore from './validations/restore';
import restore from './services/restore';
import validateUpdatePass from './validations/updatePass';
import updatePass from './services/updatePass';
import authorizeUser from '../../middlewares/authorizeUser';

const router = express.Router();

router
  .post('/login', loginValidate, login);

router
  .post('/register', registerValidate, register);

router
  .post('/verify', verifyValidate, verify);

router
  .post('/restore', authorizeUser, validateRestore, restore);

router
  .post('/restore/verify', authorizeUser, validateUpdatePass, updatePass);

export default router;
