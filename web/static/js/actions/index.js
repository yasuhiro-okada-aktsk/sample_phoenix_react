import { createAction } from 'redux-actions'

import { empty } from "./empty"
import { METHOD_POST, createApiMeta } from "./api";
import * as Error from './error'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export let resetErrorMessage = createAction(RESET_ERROR_MESSAGE);
export let createErrorMeta = Error.createErrorMeta;


export const SIGN_UP = "SIGN_UP";
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const signUp = createAction(SIGN_UP,
  empty,
  user => createApiMeta("/api/v1/users", user, METHOD_POST));


export const logIn = createAction(LOG_IN,
  empty,
  user => createApiMeta("/api/v1/login", user, METHOD_POST));

export const logOut = createAction(LOG_OUT);


export const FEED_ADD = "FEED_ADD";

export const feedAdd = createAction(FEED_ADD,
  empty,
  url => createApiMeta("/api/v1/feeds", { feed_url: url }, METHOD_POST));
