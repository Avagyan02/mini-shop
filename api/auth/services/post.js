const Users = require('../../../models/user');
const {sendErrorResponse} = require('../../../utils/responseHelpers');
const bcrypt = require('bcrypt');
const generateJwtToken = require('../token/JWT');
const HTTP_STATUS_CODE = require('../../../utils/constants');

function createUser(req,res){
  Users
    .create({email: req.body.email, password: bcrypt.hashSync(req.body.password, 7)})
    .then(result => res.status(HTTP_STATUS_CODE.SUCCESS).json({token: generateJwtToken(result._id, result.email, result.password)}))
    .catch(err => sendErrorResponse(err, res))
}

module.exports = createUser;