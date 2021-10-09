import path from 'path';
import fs from 'fs';
import { link } from './constants';
import { sendFailedResponse } from './responseHelpers';

function deleteFile(req, res) {
  if (req.files) {
    req.files.forEach((elem) => fs.unlinkSync(path.join(link, elem.path.split('\\')[1])));
  } else {
    return sendFailedResponse(res, 'Image is required');
  }
}

export default deleteFile;
