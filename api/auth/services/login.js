const Users = require('../../../models/user');
const {sendSuccessResponse,sendFailedResponse,sendErrorResponse} = require('../../../utils/responseHelpers');
const bcrypt = require('bcrypt');
const generateUserToken = require('../token/JWT');

function createUser(req,res){
  Users
    .findOne({email: req.body.email})
    .then(result => {
      if(result){
        if(result.verified){
          let pass = bcrypt.compareSync(req.body.password, result.password);
          if(pass){
            sendSuccessResponse(res, "Logged in", generateUserToken(result._id, result.email));
          }else{
            sendFailedResponse(res,"Incorrect email or password");
          }
        }else{
          sendFailedResponse(res,"Go through full verification");
        }
      } else {
        sendFailedResponse(res,"Incorrect email or password");
      }
    })
    .catch(err => sendErrorResponse(err, res))
}

module.exports = createUser;