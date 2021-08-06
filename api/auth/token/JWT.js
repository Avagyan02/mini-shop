const JWT = require('jsonwebtoken');
const {secret} = require('./config');

function generateJwtToken(id, email, pass){
  const payload = {
    id,
    email,
    pass
  }
  return JWT.sign(payload, secret);
}

module.exports = generateJwtToken;