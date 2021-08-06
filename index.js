const app = require('./app');
const http = require('http');
const getUsers = require('./utils/createAdminUser');
require('./mongodb');

http
  .createServer(app, getUsers())
  .listen(3000, () => console.log('Server run'));
