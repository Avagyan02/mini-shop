const Users = require('../../../models/user');
const {sendSuccessResponse,sendErrorResponse} = require('../../../utils/responseHelpers');
const bcrypt = require('bcrypt');

function register(req,res){
  Users.create({name: req.body.name, surname: req.body.surname, email: req.body.email, 
  password: bcrypt.hashSync(req.body.password, 10), telephone: req.body.telephone})
    .then(result => sendSuccessResponse(res, 'User created', result))
    .catch(err => sendErrorResponse(res,err))
}

module.exports = register;