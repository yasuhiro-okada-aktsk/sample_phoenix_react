import React, { Component, PropTypes } from 'react';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="col-xs-2"></div>
        <form className="col-xs-4" onSubmit={::this.handleLoginClick}>
          <div className="form-group">
            <label>Email</label>
            <input type="text" placeholder="Your email" className="form-control" ref="email"/>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Your password" className="form-control" ref="password"/>
          </div>

          <div className="form-group">
            <input type="submit" value="Log in" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    );
  }

  handleLoginClick(e) {
    e.preventDefault();

    var email = this.refs.email.value.trim();
    var password = this.refs.password.value.trim();
    if (!email || !password) {
      alert('empty!');
      return;
    }

    this.props.onSignInClick({user: {email: email, password: password}});
  }

  _onChange() {
    $(location).attr('href', "/");
  }
};

SignIn.propTypes = {
  onSignInClick: PropTypes.func.isRequired
};
