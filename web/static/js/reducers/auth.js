import { LOG_IN, LOG_OUT } from '../actions/auth';

export default function auth(state = "", action) {
  switch (action.type) {
    case LOG_IN:
      return action.token;

    case LOG_OUT:
      return "";

    default:
      return state;
  }
}
