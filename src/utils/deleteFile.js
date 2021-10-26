import fs from 'fs';

function deleteFile(pathList) {
  pathList.forEach((element) => fs.unlinkSync(element.path));
}

export default deleteFile;
