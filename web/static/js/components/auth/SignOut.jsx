import React from 'react'

import AuthActionCreators from '../../actions/AuthActionCreators';

export default class SignOut extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("sign out");
    AuthActionCreators.logOut();
  }

  render() {
    return <p>You are now logged out</p>
  }
};
