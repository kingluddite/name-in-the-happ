import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

export const Header = (props) => {
  const renderSlogan = () => {
    if (props.slogan) {
      return <h2>{props.slogan}</h2>;
    }

    return undefined;
  };

  return (
    <header className="header">
      <div className="header__content">
        <h1>{props.title}</h1>
        <h2 className="header__slogan">{renderSlogan()}</h2>
        <div>
          <button
            className="button"
            onClick={() => { return props.handleLogout(); }}>
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
  slogan: PropTypes.string,
};

Header.defaultProps = {
  title: 'Name from the Happ',
};

export default createContainer(() => {
  return ({
    handleLogout: () => { return Accounts.logout(); },
  });
}, Header);
