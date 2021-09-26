import Joi from 'joi';
import { sendFailedResponse } from '../../../utils/responseHelpers';
import { HTTP_STATUS_CODE } from '../../../utils/constants';

function validateCategoryList(req, res, next) {
  const joiSchema = Joi.object().keys({
    limit: Joi.number().integer().min(1).max(30)
      .required(),
    pageNo: Joi.number().integer().min(1).required(),
  });

  const { error } = joiSchema.validate(req.query);
  if (error) {
    return sendFailedResponse(res, error, HTTP_STATUS_CODE.BAD_REQUEST);
  }
  next();
}

export default validateCategoryList;
