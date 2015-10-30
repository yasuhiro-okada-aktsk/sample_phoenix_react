import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import * as Actions from '../../actions';
import * as AuthActions from '../../actions/auth';
import SignUp from "../../components/auth/SignUp.jsx"

class SignUpPage extends Component {

  componentDidMount() {
    this.move()
  }

  componentDidUpdate(prevProps, prevState) {
    this.move()
  }

  move() {
    console.log("move : " + this.props.auth );
    if(this.props.auth != "") {
      this.props.pushState(null, "../");
    }
  }

  handleClickSignUp(user) {
    this.props.signUp(user);
  }

  render() {
    return (
      <SignUp onClickSignUp={::this.handleClickSignUp}/>
    );
  }
}

SignUpPage.propTypes = {
  auth: PropTypes.string.isRequired,
  pushState: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch),
    ...bindActionCreators(AuthActions, dispatch),
    pushState
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
