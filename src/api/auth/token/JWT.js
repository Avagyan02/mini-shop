import JWT from 'jsonwebtoken';
import secret from './config';

function generateJwtToken(id, email, role) {
  const payload = {
    id,
    email,
    role,
  };
  return JWT.sign(payload, secret.key);
}

export default generateJwtToken;
