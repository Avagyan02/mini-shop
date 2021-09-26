import express from 'express';
import create from './services/post';
import readMany from './services/getMany';
import update from './services/put';
import delCat from './services/delete';
import read from './services/getOne';
import validate from './validations/validateCategory';
import search from './validations/findCategory';
import regexpId from '../../middlewares/veritableId';
import validateCategoryList from './validations/validateCategoryList';
import authorizeUser from '../../middlewares/authorizeUser';

const router = express.Router();

router
  .route('/')
  .post(authorizeUser, validate, create)
  .get(validateCategoryList, readMany);

router
  .route('/:id')
  .put(authorizeUser, regexpId, search, validate, update)
  .delete(authorizeUser, regexpId, search, delCat)
  .get(regexpId, search, read);

export default router;
