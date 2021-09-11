const { HTTP_STATUS_CODE } = require('./constants');

function notFound(req, res) {
  return res.status(HTTP_STATUS_CODE.NOT_FOUND).send('Page NOT_FOUND');
}

module.exports = notFound;
