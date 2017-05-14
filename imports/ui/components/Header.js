import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router';

const PageHeader = (props) => {
  const renderSlogan = () => {
    if (props.slogan) {
      return <h2>{props.slogan}</h2>;
    }

    return undefined;
  };

  const handleLogout = () => {
    Accounts.logout();
  };

  const renderNav = () => {
    if (Meteor.userId()) {
      return (
        <div>
          <button className="button" onClick={handleLogout}>Logout</button>
        </div>
      );
    }
    return (
      <nav className="nav">
        <ul className="nav__ul">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/">Log In</Link></li>
        </ul>
      </nav>
    );
  };

  return (
    <header className="header">
      <div className="header__content">
        <h1>{props.title}</h1>
        <h2 className="header__slogan">{renderSlogan()}</h2>
        {renderNav()}
        </div>
      </header>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  slogan: PropTypes.string,
};

PageHeader.defaultProps = {
  title: 'Name from the Happ',
};

export default PageHeader;
