import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SignIn from '../../components/auth/SignIn.jsx';
import zip from 'lodash/array/zip';

function loadData(props) {
  const { login } = props;
  props.loadUser(login, ['name']);
  props.loadStarred(login);
}

class SignInPage extends Component {
  constructor(props) {
    super(props);
  }

  handleSignInClick() {
    //this.props.loadStarred(this.props.login, true);
  }

  render() {
    return (
      <SignIn onSignInClick={::this.handleSignInClick}/>
    );
  }
}

SignInPage.propTypes = {
};

function mapStateToProps(state) {

  return state;
}

export default connect(mapStateToProps, {
})(SignInPage);
