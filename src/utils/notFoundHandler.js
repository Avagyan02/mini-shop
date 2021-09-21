import { HTTP_STATUS_CODE } from './constants';

function notFound(req, res) {
  return res.status(HTTP_STATUS_CODE.NOT_FOUND).send('Page NOT_FOUND');
}

export default notFound;
