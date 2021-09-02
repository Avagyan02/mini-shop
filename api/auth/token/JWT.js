const JWT = require('jsonwebtoken');
const {secret} = require('./config');

function generateJwtToken(id, email){ // (user)
  const payload = {
    id,
    email
  }
  return JWT.sign(payload, secret);
}

module.exports = generateJwtToken;