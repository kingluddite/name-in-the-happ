import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
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

    const renderLogout = () => {
      if (Session.get('currentPagePrivacy') === 'auth') {
        return (
         <div>
           <button
             className="button"
             onClick={() => { this.props.handleLogout(); }}>
             Logout
           </button>
         </div>
        );
      }
      return undefined;
    };

    return (
      <header className="header">
        <div className="header__content">
          <img
            className="header__nav-toggle"
            onClick={this.props.handleNavToggle} src={navImageSrc} />
          <div className="header__logo-name-container">
            <img src="/images/namehapp_logo_2.svg" onClick={this.props.handleH1Click} />
              <h1 onClick={this.props.handleH1Click}>{this.props.title}</h1>
          </div>
          <h2 className="header__slogan">{renderSlogan()}</h2>
          <div>
            <h2>{this.props.pageTitle}</h2>
          </div>
          {renderLogout()}
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
  handleH1Click: PropTypes.func.isRequired,
  slogan: PropTypes.string,
};

Header.defaultProps = {
  title: 'Name from the Happ',
};

export default createContainer(() => {
  return {
    handleLogout: () => { return Accounts.logout(); },
    handleH1Click: () => { browserHistory.push('/'); },
    handleNavToggle: () => {
      Session.set('isNavOpen', !Session.get('isNavOpen'));
    },
    isNavOpen: Session.get('isNavOpen'),
  };
}, Header);
