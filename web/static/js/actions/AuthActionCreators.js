import AppDispatcher from '../dispatcher/AppDispatcher';
import  {ActionTypes} from '../constants/Constants';

export default class AuthActionCreators {
  static logIn(user) {
    var Api = require('../api/AuthApi');
    Api.logIn(user);
  }

  static loggedIn(token) {
    console.log("loggedIn");
    AppDispatcher.dispatch({
      type: ActionTypes.LOG_IN,
      token: token
    });
  }

  static logInFailed(msg) {
    //AppDispatcher.dispatch({
    //  type: ActionTypes.SHOW_ERROR
    //});
    alert(msg)
  }

  static logOut() {
    AppDispatcher.dispatch({
      type: ActionTypes.LOG_OUT
    });
  }
};
