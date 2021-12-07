import File from '../models/files';
import { sendFailedResponse } from './responseHelpers';
import { FILE_TYPES } from './constants';

async function saveImagesFromUpload(fileList) {
  const insertData = fileList.map((elem) => ({
    originalName: elem.originalname,
    path: elem.path,
    type: FILE_TYPES.image,
  }));
  const createdFiles = await File.insertMany(insertData);
  return createdFiles.map((elem) => elem._id);
}

export default saveImagesFromUpload;
