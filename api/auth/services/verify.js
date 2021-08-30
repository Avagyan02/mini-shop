const Users = require('../../../models/user');
const bcrypt = require('bcrypt');
const {sendSuccessResponse,sendFailedResponse,sendErrorResponse} = require('../../../utils/responseHelpers');

function verifyUser(req, res){
  Users.findOne({email: req.body.email, verified: false, userCode: req.body.code})
    .then(result => {
      if(result){
        Users.updateOne({_id: result._id}, {$set: {verified: true}})
          .then(() => sendSuccessResponse(res, 'User verified'))
          .catch(err => sendErrorResponse(err, res))
      }else{
        return sendFailedResponse(res, 'Wrong data');
      }
    })
    .catch(err => sendErrorResponse(err, res));
}

module.exports = verifyUser;