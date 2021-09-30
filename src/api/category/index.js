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
import { authorizeAdmin, authorizeGuestOrUser } from '../../middlewares/authorize';

const router = express.Router();

router
  .route('/')
  .post(authorizeAdmin, validate, create)
  .get(authorizeGuestOrUser, validateCategoryList, readMany);

router
  .route('/:id')
  .put(authorizeAdmin, regexpId, search, validate, update)
  .delete(authorizeAdmin, regexpId, search, delCat)
  .get(authorizeGuestOrUser, regexpId, search, read);

export default router;
