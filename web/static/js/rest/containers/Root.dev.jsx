import React, { Component, PropTypes } from 'react';
import { ReduxRouter } from 'redux-router';
import DevTools from './DevTools.jsx';

export default class Root extends Component {
  render() {
    return (
      <div>
        <ReduxRouter />
        <DevTools />
      </div>
    );
  }
}
