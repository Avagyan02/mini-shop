import File from '../models/files';
import { FILE_TYPES } from './constants';
import { sendErrorResponse } from './responseHelpers';

async function saveFilesFromUploads(res, fileList) {
  try {
    const fileData = [];
    fileList.forEach((elem) => {
      fileData.push({
        originalName: elem.originalname,
        path: elem.path,
        type: FILE_TYPES.image,
      });
    });
    const fileCreate = await File.insertMany(fileData);
    return fileCreate.map((elem) => elem._id);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default saveFilesFromUploads;
