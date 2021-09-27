export const HTTP_STATUSES = {
  SUCCESS: {
    code: 200,
    message: 'SUCCESS',
  },
  BAD_REQUEST: {
    code: 400,
    message: 'BAD_REQUEST',
  },
  NOT_AUTHORIZED: {
    code: 401,
    message: 'NOT_AUTHORIZED',
  },
  FORBIDDEN: {
    code: 403,
    message: 'FORBIDDEN',
  },
  NOT_FOUND: {
    code: 404,
    message: 'NOT_FOUND',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'INTERNAL_SERVER_ERROR',
  },
};

export const USER_ROLES = {
  admin: 1,
  user: 2,
};
