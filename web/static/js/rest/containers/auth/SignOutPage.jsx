import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../../actions';

export default class SignOutPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.logOut();
  }

  render() {
    return <p>You are now logged out</p>
  }
};

SignOutPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOutPage);
