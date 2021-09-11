const bcrypt = require('bcrypt');
const Users = require('../../../models/user');
const { sendSuccessResponse, sendFailedResponse, sendErrorResponse } = require('../../../utils/responseHelpers');
const generateUserToken = require('../token/JWT');

function createUser(req, res) {
  const message = 'Incorrect email or password';

  Users
    .findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        if (result.verified) {
          const pass = bcrypt.compareSync(req.body.password, result.password);
          if (pass) {
            sendSuccessResponse(res, 'Logged in', generateUserToken(result._id, result.email));
          } else {
            sendFailedResponse(res, message);
          }
        } else {
          sendFailedResponse(res, 'Go through full verification');
        }
      } else {
        sendFailedResponse(res, message);
      }
    })
    .catch((err) => sendErrorResponse(err, res));
}

module.exports = createUser;
