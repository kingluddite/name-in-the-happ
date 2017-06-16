import React, { Component } from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  componentDidMount() {
    this.email.focus();
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = this.email.value.trim();
    const password = this.password.value.trim();

    if (password.length < 9) {
      return this.setState({ error: 'Password must be more than 8 characters' });
    }

    this.props.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '' });
      }
    });
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
          <button className="button form__button" type="submit">Create Account</button>
        </form>
        <Link to="/">Already Have An Account?</Link>
      </div>
      {/* END .boxed-view__box */}
    </div>
    // END .boxed-view
    );
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired,
};

export default createContainer(() => {
  return {
    createUser: Accounts.createUser,
  };
}, Signup);
