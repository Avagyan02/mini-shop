const Users = require('../../../models/user');
const getRandomCode = require('../../../utils/get_code');
const mailer = require('../../../utils/send_message');
const {sendSuccessResponse,sendFailedResponse,sendErrorResponse} = require('../../../utils/responseHelpers');

function restore(req, res){
  const code = getRandomCode('0123456789', 5);
  const message = {
    to: req.body.email,
    html: `<h1>Update password</h1>
          <h3>Use this code to update your password. ${code}</h3>`
  };

  Users.findOne({email: req.body.email})
    .then(result => {
      if (result) {
        if (result.verified) {
          Users.updateOne({_id: result._id}, {$set: {restoreCode: code}})
          .then(() => {
            sendSuccessResponse(res, 'Message send');
            mailer(message);
          })
          .catch(err => sendErrorResponse(err, res));
        } else {
          sendFailedResponse(res, 'Go through full verification'); 
        }
      } else {
        sendFailedResponse(res, 'Wrong email');
      }
    })
    .catch(err => sendErrorResponse(err, res));
}

module.exports = restore;