jest.mock('../../dispatcher/AppDispatcher');
jest.dontMock('../../constants/Constants');
jest.dontMock('../AuthStore');

var mock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: mock });


describe('AuthStore', function () {

  var ActionTypes = require("../../constants/Constants").ActionTypes;
  var AppDispatcher;
  var Store;
  var callback;

  // mock actions
  var actionLogIn = {
    type: ActionTypes.LOG_IN,
    token: 'abc'
  };
  var actionLogOut = {
    type: ActionTypes.LOG_OUT
  };

  beforeEach(function () {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    Store = require('../AuthStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function () {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with no token', function () {
    expect(Store.isLoggedIn()).toBeFalsy();
  });

  it('log in', function () {
    callback(actionLogIn);
    expect(Store.isLoggedIn()).toBeTruthy();
    expect(Store.getToken()).toBe('abc');
  });

  it('log out', function () {
    callback(actionLogIn);
    expect(Store.isLoggedIn()).toBeTruthy();
    expect(Store.getToken()).toBe('abc');

    callback(actionLogOut);
    expect(Store.isLoggedIn()).toBeFalsy();
    expect(Store.getToken()).toBe('');
  });

});
