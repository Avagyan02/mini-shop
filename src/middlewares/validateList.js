import Joi from 'joi';
import { sendFailedResponse } from '../utils/responseHelpers';

function validateList(req, res, next) {
  const joiSchema = Joi.object().keys({
    limit: Joi.number().integer().min(1).max(30)
      .required(),
    pageNo: Joi.number().integer().min(1).required(),
    search: Joi.string().min(2),
    priceTo: Joi.number().integer(),
    priceFrom: Joi.number().integer().min(10),
  });
  const { error } = joiSchema.validate(req.query);
  if (error) {
    return sendFailedResponse(res, error);
  }
  next();
}

export default validateList;
