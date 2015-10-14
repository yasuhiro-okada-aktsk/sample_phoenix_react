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

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './components/SampleApp.jsx'
import IndexPage from './components/IndexPage.jsx'
import Page1 from './components/Page1.jsx'
import Page2 from './components/Page2.jsx'
import DefaultPage from './components/DefaultPage.jsx'

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage}/>
      <Route path="page1" component={Page1}/>
      <Route path="page2" component={Page2}/>
      <Route path="*" component={DefaultPage}/>
    </Route>
  </Router>
), document.getElementById("container"));
