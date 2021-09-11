const Joi = require('joi');
const { sendFailedResponse } = require('../../../utils/responseHelpers');

function validateRestore(req, res, next) {
  const joiSchema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
  });

  const { error } = joiSchema.validate(req.body);
  if (error) {
    return sendFailedResponse(res, error);
  }
  next();
}

module.exports = validateRestore;
