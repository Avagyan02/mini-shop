const Users = require('../models/user');
const {sendErrorResponse} = require('./responseHelpers');
const bcrypt = require('bcrypt');

function getUsers(req, res){
  Users.countDocuments()
    .then(usersCount => {
      if(!usersCount){
        Users.create({email: 'samvel.avagyan.02@bk.ru', password: bcrypt.hashSync('qwerty12345', 10)});
      }else{
        console.log('Users collection is not empty');
      }
    })
    .catch(err => sendErrorResponse(err, res));
}

module.exports = getUsers;