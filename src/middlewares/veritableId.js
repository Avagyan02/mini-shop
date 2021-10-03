import { sendFailedResponse } from '../utils/responseHelpers';

function testId(req, res, next) {
  const Id = req.params.id || req.body.createdBy && req.body.categoryId;
  const regexpId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  if (!regexpId.test(Id)) {
    return sendFailedResponse(res, 'Not correct Id');
  }
  next();
}

export default testId;
