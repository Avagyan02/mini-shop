import fs from 'fs';

function deleteFile(pathList) {
  pathList.files.forEach((element) => fs.unlinkSync(element.path));
}

export default deleteFile;
