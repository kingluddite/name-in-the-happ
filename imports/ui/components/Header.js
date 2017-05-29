import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export class Header extends Component {

  render() {
    const navImageSrc = this.props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
    const renderSlogan = () => {
      if (this.props.slogan) {
        return <h2>{this.props.slogan}</h2>;
      }
      return undefined;
    };

    return (
      <header className="header">
        <div className="header__content">
          <img
            className="header__nav-toggle"
            onClick={this.props.handleNavToggle} src={navImageSrc} />
          <h1>{this.props.title}</h1>
          <h2 className="header__slogan">{renderSlogan()}</h2>
          <div>{this.props.pageTitle}</div>
          <div>
            <button
              className="button"
              onClick={() => { this.props.handleLogout(); }}>
              Logout
            </button>
          </div>
        </div>
      </header>
    );
  }

}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  pageTitle: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  handleNavToggle: PropTypes.func.isRequired,
  slogan: PropTypes.string,
};

Header.defaultProps = {
  title: 'Name from the Happ',
};

export default createContainer(() => {
  return {
    handleLogout: () => { return Accounts.logout(); },
    handleNavToggle: () => {
      Session.set('isNavOpen', !Session.get('isNavOpen'));
    },
    isNavOpen: Session.get('isNavOpen'),
  };
}, Header);
