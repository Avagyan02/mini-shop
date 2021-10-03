import express from 'express';
import { authorizeAdmin } from '../../middlewares/authorize';
import regexpId from '../../middlewares/veritableId';
import searchCategory from '../category/validations/findCategory';
import validateProduct from './validations/validateProduct';
import create from './services/post';

const router = express.Router();

router
  .route('/')
  .post(authorizeAdmin, regexpId, searchCategory, validateProduct, create);
