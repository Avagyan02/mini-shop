import fs from 'fs';

function deleteFile(pathList) {
  if (!pathList) {
    return false;
  }
  pathList.forEach((element) => fs.unlinkSync(element.path));
}

export default deleteFile;
