import path from 'path';
import fs from 'fs';
import { link } from './constants';

function deleteFile(req, res) {
  req.files.forEach((elem) => fs.unlinkSync(path.join(link, elem.path.split('\\')[1])));
}

export default deleteFile;
