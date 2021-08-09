const Users = require('../../../models/user');
const {sendSuccessResponse,sendFailedResponse,sendErrorResponse} = require('../../../utils/responseHelpers');
const bcrypt = require('bcrypt');
const generateJwtToken = require('../token/JWT');

function createUser(req,res){
  Users
    .findOne({email: req.body.email})
    .then(result => {
      let pass = bcrypt.compareSync(req.body.password, result.password);
      if(result && pass){
        sendSuccessResponse(res, "Logged in", {token: generateJwtToken(result._id, result.email, result.password)});
      }else{
        sendFailedResponse(res,"Incorrect email or password");
      }
    })
    .catch(err => sendErrorResponse(err, res))
}

module.exports = createUser;