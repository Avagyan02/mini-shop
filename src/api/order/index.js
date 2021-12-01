import express from 'express';
import createOrder from './services/post';
import updateStatus from './services/updateStatus';
import validateOrder from './validations/validateOrder';
import findOrder from './validations/findOrder';
import validateUpdateOrderStatus from './validations/validateUpdateOrderStatus';
import { authorizeAdmin, authorizeUser } from '../../middlewares/authorize';

const router = express.Router();

router
  .post('/', authorizeUser, validateOrder, createOrder);

router
  .put('/status/:orderId', authorizeAdmin, findOrder, validateUpdateOrderStatus, updateStatus);

export default router;
