const Users = require('../../../models/user');
const {sendSuccessResponse,sendErrorResponse} = require('../../../utils/responseHelpers');
const bcrypt = require('bcrypt');
const code = require('../../../utils/get_code')
const mailer = require('../../../utils/send_message');

function register(req,res){
  Users.create({name: req.body.name, surname: req.body.surname, email: req.body.email, 
  password: bcrypt.hashSync(req.body.password, 10), telephone: req.body.telephone, userCode: code})
    .then(result => {
      sendSuccessResponse(res, 'User created', true);

      const message = {
        to: req.body.email,
        html: `<h1>You registered</h1>
              <h3>To pass full verification use this code ${code}</h3>`
      };
      mailer(message);
    })
    .catch(err => sendErrorResponse(res,err))
}

module.exports = register;