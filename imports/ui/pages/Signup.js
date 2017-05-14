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

  componentDidMount() {
    this.email.focus();
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
    return false;
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
        { this.state.error ? <p className="errors">{this.state.error}</p> : undefined }

        <form
          className="boxed-view__form"
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
          <button className="button" type="submit">Create Account</button>
        </form>
        <Link to="/">Already Have An Account?</Link>
      </div>
      {/* END .boxed-view__box */}
    </div>
    // END .boxed-view
    );
  }
}

export default Signup;
