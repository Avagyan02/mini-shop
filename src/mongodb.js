import mongoose from 'mongoose';
import createAdmin from './utils/createAdminUser';

async function connect() {
  try {
    const connectDb = mongoose.connect('mongodb://localhost/categories',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    createAdmin();
    console.log('Connect to db done');
  } catch (error) {
    console.log('Dont connect to db', error);
  }
}

export default connect;
