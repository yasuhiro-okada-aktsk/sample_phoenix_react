import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './store';
import {ActionTypes} from '../constants/Constants';

class AuthStore extends Store {

  isLoggedIn() {
    return !!localStorage.token;
  }

  logIn(token) {
    localStorage.token = token;
  }

  logOut() {
    localStorage.token = "";
  }

  getToken() {
    return localStorage.token;
  }
}

let store = new AuthStore();

AppDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      var token = action.token.trim();
      if (token !== '') {
        store.logIn(token);
        store.emitChange();
      }
      break;

    case ActionTypes.LOG_OUT:
      store.logOut();
      store.emitChange();
      break;

    default:
    // no op
  }
});

export default store;
