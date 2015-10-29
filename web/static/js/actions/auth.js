import {createAction} from "redux-actions"
import {METHOD_POST, createMeta} from "./api";

export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCESS = 'LOG_IN_SUCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';

export const signUp = createAction(SIGN_UP,
  user => user,
  user => createMeta("/api/v1/users", user, METHOD_POST, signUpSuccess, signUpFailure));

let signUpSuccess = createAction(SIGN_UP_SUCCESS);
let signUpFailure = createAction(SIGN_UP_FAILURE);

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
