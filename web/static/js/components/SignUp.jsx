import React from 'react'
import ReactDOM from 'react-dom'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    var email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    var password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    if (!name || !email || !password) {
      alert('empty!');
      return;
    }
    this.signUp({user: {name: name, email: email, password: password}});
  }

  signUp(user) {
    $.ajax({
      url: "/api/v1/users",
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function (data) {
        this.setState({data: data});
        alert('success');
        $(location).attr('href', "/")
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        alert('error')
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <div className="col-xs-2"></div>
        <form className="col-xs-4 signUpForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your name" className="form-control" ref="name"/>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="text" placeholder="Your email" className="form-control" ref="email"/>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Your password" className="form-control" ref="password"/>
          </div>

          <div className="form-group">
            <input type="submit" value="Sign up" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    );
  }
};
