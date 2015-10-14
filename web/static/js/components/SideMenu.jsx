import React from 'react'
import { Router, Route, Link } from 'react-router'

// http://bootsnipp.com/snippets/featured/fancy-sidebar-navigation

export default React.createClass({
  render: function () {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
        <ul className="nav sidebar-nav">
          <li className="sidebar-brand"><Link to="/">Brand</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/page1">page1</Link></li>
          <li><Link to="/page2">page2</Link></li>
          <li><a href="/page1">page1 (server)</a></li>

          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
               aria-expanded="false">Help <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li className="dropdown-header">Help</li>
              <li><a href="/static/help">Help</a></li>
              <li><a href="/static/about">About</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
});
