import merge from 'lodash/object/merge';
import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import { handleActions } from 'redux-actions'

import * as ActionTypes from '../actions';

function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  }

  if (error) {
    return error;
  }

  return state;
}

export let auth = handleActions({
  SIGN_UP: (state, action) => (
    action.payload.token ? action.payload.token : state
  ),

  LOG_IN: (state, action) => (
    action.token
  ),

  LOG_OUT: (state, action) => (
    ""
  )
}, "");


const rootReducer = combineReducers({
  auth,
  errorMessage,
  router
});

export default rootReducer;
