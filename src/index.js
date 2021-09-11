const http = require('http');
const app = require('./app');
const adminsCount = require('./utils/createAdminUser');
require('./mongodb');

http
  .createServer(app, adminsCount())
  .listen(3000, () => console.log('Server run'));
