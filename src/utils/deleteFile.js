import fs from 'fs';

function deleteFile(req) {
  req.files.forEach((elem) => fs.unlinkSync(elem.path));
}

export default deleteFile;
