const Category = require('../../../models/category');
const { sendSuccessResponse, sendErrorResponse } = require('../../../utils/responseHelpers');

function create(req, res) {
  Category
    .create({ nameEn: req.body.nameEn, nameRu: req.body.nameRu, nameHy: req.body.nameHy })
    .then((result) => sendSuccessResponse(res, 'Category created', result))
    .catch((err) => sendErrorResponse(res, err));
}

module.exports = create;
