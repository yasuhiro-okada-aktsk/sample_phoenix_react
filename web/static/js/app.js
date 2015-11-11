// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "deps/phoenix_html/web/static/js/phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

window.$ = window.jQuery = require('jquery');
require('bootstrap');

import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Adrenaline } from './adrenaline';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import SampleAdaptor from './adaptor';

const store = configureStore();

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app')
);

