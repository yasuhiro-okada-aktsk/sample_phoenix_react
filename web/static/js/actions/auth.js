import { CALL_API, Schemas } from '../middleware/api';

export const LOG_IN = 'LOG_IN';
export const LOG_SUCESS = 'LOG_SUCESS';
export const LOG_FAILURE = 'LOG_FAILURE';
export const LOG_OUT = 'LOG_OUT';

function postSignIn(login) {
  return {
    [CALL_API]: {
      types: [LOG_IN, LOG_SUCESS, LOG_FAILURE],
      endpoint: `/api/v1/login`,
      schema: Schemas.USER
    }
  };
}


export function logIn(token) {
  return {
    type: LOG_IN,
    token: token
  };
}

export function logOut() {
  return {
    type: LOG_OUT
  };
}
