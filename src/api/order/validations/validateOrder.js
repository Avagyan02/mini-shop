import Joi from 'joi';
import Product from '../../../models/product';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';
import { ObjectIDRegexp } from '../../../utils/constants';

async function validateOrder(req, res, next) {
  const joiSchema = Joi.object().keys({
    productList: Joi.array().items(
      Joi.object({
        id: Joi.string().pattern(ObjectIDRegexp).required(),
        quantity: Joi.number().integer().min(1).required(),
      }),
    ).min(1).required(),
  });
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      return sendFailedResponse(res);
    }
    const orderProducts = [];
    const { productList } = req.body;
    productList.forEach((elem) => {
      orderProducts.push(Product.findOne({ _id: elem.id, quantity: { $gte: elem.quantity }, deleted: false }));
    });
    const result = await Promise.all(orderProducts);
    const checkObject = result.every((elem) => elem instanceof Object);
    if (!checkObject) {
      return sendFailedResponse(res);
    }
    req.orderProducts = result;
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default validateOrder;
