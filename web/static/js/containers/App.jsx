import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { resetErrorMessage } from '../actions';

import SideMenu from '../components/SideMenu.jsx'
import NaviBar from '../components/NaviBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.buildSidebar();
  }

  buildSidebar() {
    // http://bootsnipp.com/snippets/featured/fancy-sidebar-navigation
    var trigger = $('.hamburger');
    var sideMenu = this.refs.sideMenu;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {
      if (sideMenu.isClosed()) {
        sideMenu.close();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
      } else {
        sideMenu.open();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
      }
    }

    $('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
    });
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange(nextValue) {
    this.props.pushState(null, `/${nextValue}`);
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={::this.handleDismissClick}>
        Dismiss
      </a>)
      </p>
    );
  }

  render() {
    const { children, inputValue } = this.props;
    return (
      <div id="wrapper">
        <SideMenu ref="sideMenu"/>

        <div id="page-content-wrapper">
          <button type="button" className="hamburger is-closed" data-toggle="offcanvas">
            <span className="hamb-top"></span>
            <span className="hamb-middle"></span>
            <span className="hamb-bottom"></span>
          </button>

          <div className="container">
            <NaviBar loggedIn={this.props.loggedIn} />
            {this.renderErrorMessage()}

            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Redux
  loggedIn: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
    loggedIn: !(state.auth == ""),
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1)
  };
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  pushState
})(App);
