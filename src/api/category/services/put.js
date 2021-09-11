const Category = require('../../../models/category');
const { sendSuccessResponse, sendErrorResponse } = require('../../../utils/responseHelpers');

function update(req, res) {
  Category
    .findOneAndUpdate({ _id: req.params.id }, {
      $set: {
        nameEn: req.body.nameEn,
        nameRu: req.body.nameRu,
        nameHy: req.body.nameHy,
      },
    }, { new: true })
    .then((result) => sendSuccessResponse(res, 'Category updated', result))
    .catch((err) => sendErrorResponse(res, err));
}

module.exports = update;
