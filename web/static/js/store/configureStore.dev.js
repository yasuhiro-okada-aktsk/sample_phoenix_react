import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage'

import DevTools from '../containers/DevTools.jsx';
import createHistory from 'history/lib/createBrowserHistory';
import routes from '../routes.jsx';
import createLogger from 'redux-logger';
import {api} from '../middleware/api'

export const finalCreateStore = compose(
  persistState("auth"),
  applyMiddleware(thunk, api),
  reduxReactRouter({routes, createHistory}),
  applyMiddleware(createLogger()),
  DevTools.instrument()
)(createStore);
