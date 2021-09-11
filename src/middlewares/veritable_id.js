const { sendFailedResponse } = require('../utils/responseHelpers');

function testId(req, res, next) {
  const Id = req.params.id;
  const regexpId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  if (regexpId.test(Id)) {
    return next();
  }
  return sendFailedResponse(res, 'Not correct Id');
}

module.exports = testId;
