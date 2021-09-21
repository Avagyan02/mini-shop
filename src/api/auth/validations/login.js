import Joi from 'joi';
import { sendFailedResponse } from '../../../utils/responseHelpers';

function loginValidate(req, res, next) {
  const joiSchema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  });

  const { error } = joiSchema.validate(req.body);
  if (error) {
    return sendFailedResponse(res, error);
  }
  next();
}

export default loginValidate;
