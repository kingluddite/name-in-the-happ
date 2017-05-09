import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }

  handleSubmit(e) {
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    e.preventDefault();

    Meteor.loginWithPassword({ email }, password, (err) => {
      console.log('Login callback', err);
    });
  }

  render() {
    return (
      <div>
        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form className="form" onSubmit={this.handleSubmit.bind(this)}>
          <input type="email" ref="email" placeholder="Email" />
          <input type="password" ref="password" placeholder="Password"/>
          <button type="submit">Login</button>
        </form>

        <Link to="/signup">Have an account?</Link>
      </div>
    );
  }
};

export default Login;