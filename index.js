const app = require('./app');
const http = require('http');
const adminsCount = require('./utils/createAdminUser');
require('./mongodb');

http
  .createServer(app, adminsCount())
  .listen(3000, () => console.log('Server run'));
