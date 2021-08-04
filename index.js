const app = require('./app');
const http = require('http');
require('./mongodb');

http
  .createServer(app)
  .listen(3000, () => console.log('Server run'));
