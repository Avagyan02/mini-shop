import bcrypt from 'bcrypt';
import Users from '../models/user';
import { sendErrorResponse } from './responseHelpers';
import { USER_ROLES } from './constants';

async function createAdminUser(req, res) {
  try {
    const user = await Users.findOne({ role: USER_ROLES.admin });
    if (!user) {
      Users.create({
        name: 'Samvel',
        surname: 'Avagyan',
        email: 'samvel.avagyan.08@bk.ru',
        password: bcrypt.hashSync('qwerty12345', 10),
        telephone: +37494252626,
        role: USER_ROLES.admin,
      });
    } else {
      console.log('Users collection is not empty');
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default createAdminUser;
