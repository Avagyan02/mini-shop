import JWT from 'jsonwebtoken';
import secret from './config';

function generateJwtToken(id, email) {
  const payload = {
    id,
    email,
  };
  return JWT.sign(payload, secret.key);
}

export default generateJwtToken;
