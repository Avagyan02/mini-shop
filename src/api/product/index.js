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
import searchCategory from '../../middlewares/findCategory';

const router = express.Router();

router
  .route('/')
  .post(authorizeAdmin, upload.single('image'), searchCategory, validateProduct, create)
  .get(authorizeGuestOrUser, validateList, readMany);

router
  .route('/:productId')
  .get(authorizeGuestOrUser, searchProduct, read)
  .delete(authorizeAdmin, searchProduct, delProd)
  .put(authorizeAdmin, upload.single('image'), searchCategory, validateProduct, update);

export default router;
