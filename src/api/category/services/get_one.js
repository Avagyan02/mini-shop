const Category = require('../../../models/category');
const { sendSuccessResponse, sendErrorResponse } = require('../../../utils/responseHelpers');

function read(req, res) {
  Category.findOne({ _id: req.params.id })
    .then((result) => sendSuccessResponse(res, 'Category details fetched', result))
    .catch((err) => sendErrorResponse(res, err));
}

module.exports = read;
