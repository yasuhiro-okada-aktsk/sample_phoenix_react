import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../../actions';
import SignIn from '../../components/auth/SignIn.jsx';

class SignInPage extends Component {
  constructor(props) {
    super(props);
  }

  handleSignInClick(user) {
    this.props.logIn(user);
  }

  render() {
    return (
      <SignIn onSignInClick={::this.handleSignInClick}/>
    );
  }
}

SignInPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
