import {createAction} from "redux-actions"

import { empty } from "./empty"
import {METHOD_POST, createApiMeta} from "./api";

export const SIGN_UP = "SIGN_UP";
export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCESS = 'LOG_IN_SUCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';

export const signUp = createAction(SIGN_UP,
  empty,
  user => createApiMeta("/api/v1/users", user, METHOD_POST));


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
