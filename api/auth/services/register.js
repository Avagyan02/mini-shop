const Users = require('../../../models/user');
const {sendSuccessResponse,sendFailedResponse,sendErrorResponse} = require('../../../utils/responseHelpers');
const bcrypt = require('bcrypt');
const getRandomCode = require('../../../utils/get_code')
const mailer = require('../../../utils/send_message');
const {USER_ROLES} = require('../../../utils/constants');

function register(req,res){
  const code = getRandomCode('0123456789', 5);
  const message = {
    to: req.body.email,
    html: `<h1>You registered</h1>
          <h3>To pass full verification use this code. ${code}</h3>`
  };

  Users.findOne({email: req.body.email})
    .then(result => {
      if (!result) {
        Users.create(
          {
          name: req.body.name, 
          surname: req.body.surname, 
          email: req.body.email, 
          password: bcrypt.hashSync(req.body.password, 10), 
          telephone: req.body.telephone, 
          userCode: code, 
          role: USER_ROLES.user
          }
        )
          .then(() => {
            sendSuccessResponse(res, 'User created');
            mailer(message);
          })
          .catch(err => sendErrorResponse(err, res))
      } else {
        if (!result.verified) {
          Users.updateOne(
            {_id: result._id}, 
            {$set: {
              name: req.body.name, 
              surname: req.body.surname,
              password: bcrypt.hashSync(req.body.password, 10),
              telephone: req.body.telephone,userCode: code
              }
            })
            .then(() => {
              sendSuccessResponse(res, 'User updated');
              mailer(message);
            })
            .catch(err => sendErrorResponse(err, res))
        } else {
            return sendFailedResponse(res, 'User verified');
        }
      }
    })
    .catch(err => sendErrorResponse(err, res))
}

module.exports = register;