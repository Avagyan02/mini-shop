import Joi from 'joi';
import Category from '../../../models/category';
import deleteFile from '../../../utils/deleteFile';
import { ObjectIDRegexp } from '../../../utils/constants';
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
      .pattern(ObjectIDRegexp)
      .required(),
  });
  const { error } = joiSchema.validate(req.body);
  if (error) {
    console.log(error);
    deleteFile(req.files);
    return sendFailedResponse(res);
  }

  try {
    const category = await Category.findOne({ _id: req.body.categoryId, deleted: false });
    if (!category || !(req.files.length)) {
      deleteFile(req.files);
      return sendFailedResponse(res);
    }
    req.category = category;
    next();
  } catch (err) {
    deleteFile(req.files);
    sendErrorResponse(err, res);
  }
}

export default validateProduct;
