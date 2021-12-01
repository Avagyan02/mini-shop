import Joi from 'joi';
import { sendFailedResponse } from '../../../utils/responseHelpers';

function validateOrderList(req, res, next) {
  const joiSchema = Joi.object().keys({
    limit: Joi.number().integer().min(1).max(30)
      .required(),
    pageNo: Joi.number().integer().min(1).required(),
    status: Joi.number().integer().min(1).max(3),
    dateFrom: Joi.date(),
    dateTo: Joi.date(),
  });
  const { error } = joiSchema.validate(req.body);
  if (error) {
    return sendFailedResponse(res);
  }
  next();
}

export default validateOrderList;
