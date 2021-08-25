const Users = require('../models/user');
const {sendErrorResponse} = require('./responseHelpers');
const bcrypt = require('bcrypt');
const code = require('./get_code');

function getUsers(req, res){
  Users.countDocuments()
    .then(usersCount => {
      if(!usersCount){
      Users.create({name: 'Samvel', surname: 'Avagyan', email: 'samvel.avagyan.08@bk.ru', password: bcrypt.hashSync('qwerty12345', 10), telephone: +37494252626, userCode: code});
      }else{
        console.log('Users collection is not empty');
      }
    })
    .catch(err => sendErrorResponse(err, res));
}

module.exports = getUsers;