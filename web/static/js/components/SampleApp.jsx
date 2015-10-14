import React from 'react'
import { Router, Route, Link } from 'react-router'

export default React.createClass({
  render: function () {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Brand</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to="/">home</Link></li>
                <li><Link to="/page1">page1</Link></li>
                <li><Link to="/page2">page2</Link></li>
                <li><a href="/page1">page1 (server)</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
});
