import express from 'express';
import create from './services/post';
import readMany from './services/getMany';
import update from './services/put';
import delCat from './services/delete';
import read from './services/getOne';
import validate from './validations/validateCategory';
import search from '../../middlewares/findCategory';
import validateList from '../../middlewares/validateList';
import { authorizeAdmin, authorizeGuestOrUser } from '../../middlewares/authorize';

const router = express.Router();

router
  .route('/')
  .post(authorizeAdmin, validate, create)
  .get(authorizeGuestOrUser, validateList, readMany);

router
  .route('/:categoryId')
  .put(authorizeAdmin, search, validate, update)
  .delete(authorizeAdmin, search, delCat)
  .get(authorizeGuestOrUser, search, read);

export default router;
