import * as Actions from '../actions/auth';

export default function auth(state = "", action) {
  switch (action.type) {
    case Actions.SIGN_UP_SUCCESS:
      return action.payload["token"];

    case Actions.LOG_IN:
      return action.token;

    case Actions.LOG_OUT:
      return "";

    default:
      return state;
  }
}
