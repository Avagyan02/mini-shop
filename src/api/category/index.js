import express from 'express';
import create from './services/post';
import readMany from './services/get_many';
import update from './services/put';
import delCat from './services/delete';
import read from './services/get_one';
import validate from './validations/validate_category';
import search from './validations/find_category';
import regexpId from '../../middlewares/veritable_id';
import validateCategoryList from './validations/validate_category_list';
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
