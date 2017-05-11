import React, { Component } from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.email.value.trim();
    const password = this.password.value.trim();

    if (password.length < 9) {
      return this.setState({ error: 'Password must be more than 8 characters' });
    }


    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '' });
      }
    });
  }
  render() {
    return (
      <div>
        <h1>Signup</h1>
        { this.state.error ? <p>{this.state.error}</p> : undefined }

        <form
          className="form"
          onSubmit={this.handleSubmit.bind(this)}
          noValidate
          >
          <input
            type="email"
            ref={ (input) => { this.email = input; }}
            placeholder="Email" />
          <input
            type="password"
            ref={ (input) => { this.password = input; }} placeholder="Password"/>
          <button type="submit">Create Account</button>
        </form>
        <Link to="/login">Already Have An Account?</Link>
      </div>
    );
  }
}

export default Signup;
