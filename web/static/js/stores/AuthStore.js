import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes} from '../constants/Constants';

var CHANGE_EVENT = 'change';

class AuthStore extends EventEmitter {

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

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
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
