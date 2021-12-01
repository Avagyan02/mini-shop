import express from 'express';
import createOrder from './services/post';
import updateStatus from './services/updateStatus';
import getOrderList from './services/getOrderList';
import getOrder from './services/getOrder';
import validateOrder from './validations/validateOrder';
import findOrder from './validations/findOrder';
import validateOrderList from './validations/validateOrderList';
import validateUpdateOrderStatus from './validations/validateUpdateOrderStatus';
import { authorizeAdmin, authorizeUser } from '../../middlewares/authorize';

const router = express.Router();

router
  .post('/', authorizeUser, validateOrder, createOrder);

router
  .put('/status/:orderId', authorizeAdmin, findOrder, validateUpdateOrderStatus, updateStatus);

router
  .get('/:orderId', authorizeUser, findOrder, getOrder);

router
  .post('/list', authorizeUser, validateOrderList, getOrderList);

export default router;
