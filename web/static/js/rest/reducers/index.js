import merge from '../../../../../node_modules/lodash/object/merge';
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

let auth = handleActions({
  SIGN_UP: (state, action) => (
    action.payload.token ? action.payload.token : state
  ),

  LOG_IN: (state, action) => (
    action.payload.token ? action.payload.token : state
  ),

  LOG_OUT: (state, action) => (
    ""
  )
}, "");

let feeds = handleActions({
  FEED_GET: (state, action) => (
    action.payload ? action.payload : state
  )
},  []);


const rootReducer = {
  auth,
  feeds,
  errorMessage,
  router
};

export default rootReducer;
