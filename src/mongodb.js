import mongoose from 'mongoose';
import createAdmin from './utils/createAdminUser';

async function connect() {
  try {
    const connectDb = mongoose.connect('mongodb://localhost/categories');
    if (connectDb) {
      createAdmin();
      console.log('Connect to db done');
    }
  } catch (error) {
    console.log('Dont connect to db', error);
  }
}

export default connect;

// const mongoose = require('mongoose');

// mongoose.Promise = require('bluebird');

// mongoose.connect('mongodb://localhost/categories')
//   .then(() => console.log('Connect to db done'))
//   .catch(() => console.log('Dont connect to db'));
