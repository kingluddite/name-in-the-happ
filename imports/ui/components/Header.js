import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const Header = (props) => {
  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
  const renderSlogan = () => {
    if (props.slogan) {
      return <h2>{props.slogan}</h2>;
    }

    return undefined;
  };

  return (
    <header className="header">
      <div className="header__content">
        <img className="header__nav-toggle" onClick={props.handleNavToggle} src={navImageSrc} />
        <h1>{props.title}</h1>
        <h2 className="header__slogan">{renderSlogan()}</h2>
        <div>
          <button
            className="button"
            onClick={() => { props.handleLogout(); }}>
            Logout
          </button>
        </div>
        </div>
      </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
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
