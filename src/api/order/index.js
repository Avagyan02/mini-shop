import express from 'express';
import createOrder from './services/post';
import updatedOrder from './services/put';
import validateOrder from './validations/validateOrder';
import findOrder from './validations/findOrder';
import validateOrderStatus from './validations/validateOrderStatus';
import { authorizeAdmin, authorizeUser } from '../../middlewares/authorize';

const router = express.Router();

router
  .post('/', authorizeUser, validateOrder, createOrder);

router
  .put('/:orderId', authorizeAdmin, findOrder, validateOrderStatus, updatedOrder);

export default router;
