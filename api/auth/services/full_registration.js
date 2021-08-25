const Users = require('../../../models/user');
const bcrypt = require('bcrypt');
const {sendSuccessResponse,sendFailedResponse,sendErrorResponse} = require('../../../utils/responseHelpers');

function fullRegister(req, res){
  Users.findOne({email: req.body.email})
    .then(result => {
      let pass = bcrypt.compareSync(req.body.password, result.password);
      if(result.userCode === req.body.code && pass){
        Users.updateOne({_id: result._id}, {$set: {verified: true}})
          .then(() => sendSuccessResponse(res, 'You are fully registered', true))
          .catch(err => sendErrorResponse(err, res))
      }else{
        return sendFailedResponse(res, 'Wrong data');
      }
    })
    .catch(err => sendErrorResponse(err, res));
}

module.exports = fullRegister;