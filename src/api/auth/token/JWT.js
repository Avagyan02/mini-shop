import JWT from 'jsonwebtoken';
import secret from './config';

function generateJwtToken(id, role) {
  const payload = {
    id,
    role,
  };
  return JWT.sign(payload, secret.key);
}

export default generateJwtToken;
