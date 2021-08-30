const Users = require('../models/user');
const {sendErrorResponse} = require('./responseHelpers');
const bcrypt = require('bcrypt');
const {USER_ROLES} = require('./constants');

function adminsCount(req, res){
  Users.findOne({role: USER_ROLES.admin})
    .then(result => {
      if(!result){
      Users.create({
        name: 'Samvel', 
        surname: 'Avagyan', 
        email: 'samvel.avagyan.08@bk.ru', 
        password: bcrypt.hashSync('qwerty12345', 10), 
        telephone: +37494252626,  
        role: USER_ROLES.admin
      });
      }else{
        console.log('Users collection is not empty');
      }
    })
    .catch(err => sendErrorResponse(err, res));
}

module.exports = adminsCount;