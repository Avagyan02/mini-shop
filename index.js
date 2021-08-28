const app = require('./app');
const http = require('http');
const createAdmin = require('./utils/createAdminUser');
require('./mongodb');

http
  .createServer(app, createAdmin())
  .listen(3000, () => console.log('Server run'));
