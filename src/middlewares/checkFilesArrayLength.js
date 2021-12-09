import { sendFailedResponse } from '../utils/responseHelpers';

function checkFilesArrayLength(req, res, next) {
  const { files } = req;
  if (!files.length) {
    return sendFailedResponse(res);
  }
  next();
}

export default checkFilesArrayLength;
