const bcrypt = require('bcrypt');
const Users = require('../../../models/user');
const { sendSuccessResponse, sendFailedResponse, sendErrorResponse } = require('../../../utils/responseHelpers');

function updatePass(req, res) {
  Users.findOne({ email: req.body.email, restoreCode: req.body.code })
    .then((result) => {
      if (result) {
        Users.updateOne({ _id: result._id }, { $set: { password: bcrypt.hashSync(req.body.password, 10) } })
          .then(() => sendSuccessResponse(res, 'Password updated'))
          .catch((err) => sendErrorResponse(err, res));
      } else {
        sendFailedResponse(res, 'Wrong email or code');
      }
    })
    .catch((err) => sendErrorResponse(err, res));
}

module.exports = updatePass;
