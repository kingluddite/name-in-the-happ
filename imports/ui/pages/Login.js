import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class Login extends Component {
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
    const email = this.email.value.trim();
    const password = this.password.value.trim();

    event.preventDefault();

    this.props.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password' });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="logo">
          <img src="./../../images/namehapp_logo.svg" alt="" />
        </div>
        <div className="boxed-view__box">
            {this.state.error ? <p className="errors">{this.state.error}</p> : undefined}
            <form
              className="boxed-view__form" onSubmit={this.handleSubmit.bind(this)}
              noValidate
              >
              <input type="email" ref={ (input) => { this.email = input; }} placeholder="Email" />
              <input
                type="password"
                ref={ (input) => { this.password = input; }} placeholder="Password"/>
              <button className="button form__button" type="submit">Login</button>
            </form>

        <Link to="/signup">Not a Member? Signup Now</Link>
      </div>
      {/* END .boxed-view__box */}
    </div>
    // END .boxed-view
    );
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired,
};

export default createContainer(() => {
  return ({
    loginWithPassword: Meteor.loginWithPassword,
  });
}, Login);
