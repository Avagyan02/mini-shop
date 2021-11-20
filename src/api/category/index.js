import express from 'express';
import create from './services/post';
import readMany from './services/getMany';
import update from './services/put';
import delCat from './services/delete';
import read from './services/getOne';
import validate from './validations/validateCategory';
import search from './validations/findCategory';
import validateList from '../../middlewares/validateList';
import { authorizeAdmin, authorizeGuestOrUser } from '../../middlewares/authorize';
import validateLanguage from '../../middlewares/validateLanguage';

const router = express.Router();

router
  .route('/')
  .post(authorizeAdmin, validate, create)
  .get(authorizeGuestOrUser, validateLanguage, validateList, readMany);

router
  .route('/:categoryId')
  .put(authorizeAdmin, search, validate, update)
  .delete(authorizeAdmin, search, delCat)
  .get(authorizeGuestOrUser, validateLanguage, search, read);

export default router;
