import React from 'react'

import AuthActionCreators from '../../actions/AuthActionCreators';
import AuthStore from '../../stores/AuthStore';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div>
        <div className="col-xs-2"></div>
        <form className="col-xs-4" onSubmit={this._onSubmit}>
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

  _onSubmit(e) {
    e.preventDefault();
    var email = this.refs.email.value.trim();
    var password = this.refs.password.value.trim();
    if (!email || !password) {
      alert('empty!');
      return;
    }

    AuthActionCreators.logIn({user: {email: email, password: password}})
  }

  _onChange() {
    $(location).attr('href', "/");
  }
};
