import Joi from 'joi';
import { sendFailedResponse } from '../../../utils/responseHelpers';

function validateCategory(req, res, next) {
  const joiSchema = Joi.object().keys({
    nameEn: Joi.string()
      .min(2)
      .max(150)
      .required(),

    nameRu: Joi.string()
      .min(2)
      .max(150)
      .required(),

    nameHy: Joi.string()
      .min(2)
      .max(150)
      .required(),
  });
  const { error } = joiSchema.validate(req.body);
  if (error) {
    return sendFailedResponse(res);
  }
  next();
}

export default validateCategory;
