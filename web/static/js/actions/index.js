import { createAction } from 'redux-actions'

import * as Error from './error'
import * as Auth from './auth'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export let resetErrorMessage = createAction(RESET_ERROR_MESSAGE);
export let createErrorMeta = Error.createErrorMeta;

export let signUp = Auth.signUp;
export let logIn = Auth.logIn;
