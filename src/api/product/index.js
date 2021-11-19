import express from 'express';
import searchProduct from './validations/findProduct';
import validateProduct from './validations/validateProduct';
import readMany from './services/getMany';
import update from './services/put';
import create from './services/post';
import read from './services/getOne';
import delProd from './services/delete';
import upload from '../../middlewares/upload';
import { authorizeAdmin, authorizeGuestOrUser } from '../../middlewares/authorize';
import validateList from '../../middlewares/validateList';
import validateLanguage from '../../middlewares/validateLanguage';

const router = express.Router();

router
  .route('/')
  .post(authorizeAdmin, upload.any('images'), validateProduct, create)
  .get(authorizeGuestOrUser, validateLanguage, validateList, readMany);

router
  .route('/:productId')
  .get(authorizeGuestOrUser, searchProduct, read)
  .delete(authorizeAdmin, searchProduct, delProd)
  .put(authorizeAdmin, upload.any('images'), searchProduct, validateProduct, update);

export default router;
