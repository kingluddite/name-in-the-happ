import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  handleSubmit(e) {
    const email = this.email.value.trim();
    const password = this.password.value.trim();

    e.preventDefault();

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password' });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form
          className="form"
          onSubmit={this.handleSubmit.bind(this)}
          noValidate
          >
          <input type="email" ref={ (input) => { this.email = input; }} placeholder="Email" />
          <input
            type="password"
            ref={ (input) => { this.password = input; }} placeholder="Password"/>
          <button type="submit">Login</button>
        </form>

        <Link to="/signup">Have an account?</Link>
      </div>
    );
  }
}

export default Login;
