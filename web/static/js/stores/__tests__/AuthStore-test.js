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
    var calledOnChange = false;
    let onChange = () =>  calledOnChange = true;

    Store.addChangeListener(onChange);
    callback(actionLogIn);
    Store.removeChangeListener(onChange);

    expect(Store.isLoggedIn()).toBeTruthy();
    expect(Store.getToken()).toBe('abc');
    expect(calledOnChange).toBeTruthy();
  });

  it('log out', function () {
    var calledOnChange = false;
    let onChange = () =>  calledOnChange = true;

    callback(actionLogIn);
    expect(Store.isLoggedIn()).toBeTruthy();
    expect(Store.getToken()).toBe('abc');
    expect(calledOnChange).toBeFalsy();

    Store.addChangeListener(onChange);
    callback(actionLogOut);
    Store.removeChangeListener(onChange);
    expect(Store.isLoggedIn()).toBeFalsy();
    expect(Store.getToken()).toBe('');
    expect(calledOnChange).toBeTruthy();
  });

});
