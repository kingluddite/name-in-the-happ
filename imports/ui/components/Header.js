import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

const PageHeader = (props) => {
  const renderSlogan = () => {
    if (props.slogan) {
      return <h2>{props.slogan}</h2>;
    }

    return undefined;
  };

  return (
    <header className="header">
      <div className="wrapper">
        <h1><Link to="/" className="header__logo">{props.title}</Link></h1>
        <h2 className="header__slogan">{renderSlogan()}</h2>
        <button
          className="button"
          onClick={() => Accounts.logout() }>Logout</button>
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
