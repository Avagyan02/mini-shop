import Joi from 'joi';
import { sendFailedResponse } from '../../../utils/responseHelpers';

function validateProduct(req, res, next) {
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

    descriptionEn: Joi.string()
      .min(20)
      .max(200)
      .required(),

    descriptionRu: Joi.string()
      .min(20)
      .max(200)
      .required(),

    descriptionHy: Joi.string()
      .min(20)
      .max(200)
      .required(),

    quantity: Joi.number()
      .integer()
      .min(1),

    image: Joi.string(),

    price: Joi.number()
      .integer()
      .min(10),
  });
  const { error } = joiSchema.validate(req.body);
  if (error) {
    return sendFailedResponse(res, error);
  }
  next();
}
