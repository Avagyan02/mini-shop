import Joi from 'joi';
import Product from '../../../models/product';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';
import { ObjectIDRegexp } from '../../../utils/constants';

async function validateOrder(req, res, next) {
  const joiSchema = Joi.object().keys({
    productList: Joi.array().unique((a, b) => a.id === b.id).items(
      Joi.object({
        id: Joi.string().pattern(ObjectIDRegexp).required(),
        quantity: Joi.number().integer().min(1).required(),
      }),
    ).min(1)
      .required(),
  });
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      return sendFailedResponse(res);
    }
    const { productList } = req.body;
    const result = await Promise.all(
      productList.map((item) => {
        return Product.findOne({ _id: item.id, quantity: { $gte: item.quantity }, deleted: false });
      }),
    );
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
