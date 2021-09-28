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
import authorize from '../../middlewares/authorize';

const router = express.Router();

router
  .route('/')
  .post(authorize, validate, create)
  .get(authorize, validateCategoryList, readMany);

router
  .route('/:id')
  .put(authorize, regexpId, search, validate, update)
  .delete(authorize, regexpId, search, delCat)
  .get(authorize, regexpId, search, read);

export default router;
