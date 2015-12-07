import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router'

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
            <a className="navbar-brand" href="#">Relay</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a href="/">Redux</a></li>
            </ul>

          </div>
        </div>
      </nav>
    );
  }

  _onChange() {
    this.state = {loggedIn: AuthStore.isLoggedIn()};
    $(location).attr('href', "/");
  }
};


NavBar.propTypes = {
};
