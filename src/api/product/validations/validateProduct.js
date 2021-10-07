import Joi from 'joi';
import Category from '../../../models/category';
import { sendFailedResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function validateProduct(req, res, next) {
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

    price: Joi.number()
      .integer()
      .min(10),

    categoryId: Joi.string()
      .pattern(new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i))
      .required(),
  });
  const { error } = joiSchema.validate(req.body);
  if (error) {
    return sendFailedResponse(res);
  }

  try {
    const category = await Category.findOne({ _id: req.body.categoryId });
    if (!category) {
      console.log(category);
      return sendFailedResponse(res);
    }
    next();
  } catch (err) {
    sendErrorResponse(err, res);
  }
}

export default validateProduct;
