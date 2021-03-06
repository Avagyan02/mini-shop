import Joi from 'joi';
import { sendFailedResponse } from '../../../utils/responseHelpers';

function validatePass(req, res, next) {
  const joiSchema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    code: Joi.number().integer().required(),
    password: Joi.string().trim().required(),
  });

  const { error } = joiSchema.validate(req.body);
  if (error) {
    return sendFailedResponse(res, error);
  }
  next();
}

export default validatePass;
