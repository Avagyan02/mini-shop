import http from 'http';
import app from './app.js';
import connect from './mongodb';

http
  .createServer(app)
  .listen(3000, () => {
    console.log('Server run');
    connect();
  });
