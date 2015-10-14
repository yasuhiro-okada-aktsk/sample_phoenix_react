import React from 'react'
import { Router, Route, Link } from 'react-router'

export default React.createClass({
  render: function () {
    return (
      <div>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/page1">page1</Link></li>
          <li><Link to="/page2">page2</Link></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
});
