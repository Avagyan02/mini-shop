import Joi from 'joi';
import Category from '../../../models/category';
import Files from '../../../models/files';
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

    image: Joi.array()
      .items(Joi.object()),

    deleteImageIdList: Joi.array()
      .items(Joi.string().pattern(ObjectIDRegexp)).unique(),
  });
  const { error } = joiSchema.validate(req.body);
  if (error) {
    console.log(error);
    deleteFile(req.files);
    return sendFailedResponse(res);
  }

  try {
    const { deleteImageIdList } = req.body;
    const { product } = req;
    const category = await Category.findOne({ _id: req.body.categoryId, deleted: false });
    if (!category || (req.method === 'POST' && !req.files)) {
      deleteFile(req.files);
      return sendFailedResponse(res);
    }
    if (deleteImageIdList) {
      const promiseArr = [];
      if (deleteImageIdList.length === product.image.length && !req.files) {
        return sendFailedResponse(res, 'Cannot delete all photos');
      }
      deleteImageIdList.forEach((elem) => {
        const imageFind = product.image.find((item) => item.toString() === elem);
        if (!imageFind) {
          deleteFile(req.files);
          return sendFailedResponse(res);
        }
        promiseArr.push(Files.findOne({ _id: elem }));
      });
      const deletedImage = await Promise.all(promiseArr);
      req.deleteImageList = deletedImage;
    }
    req.category = category;
    next();
  } catch (err) {
    deleteFile(req.files);
    sendErrorResponse(err, res);
  }
}

export default validateProduct;
