
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import PublicNavigation from './PublicNavigation.js';
// import AuthenticatedNavigation from './AuthenticatedNavigation.js';
// import container from '../../modules/container';

const renderNavigation = hasUser => (hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />);

const AppNavigation = ({ hasUser }) => (
      <nav>
        <li>
          <Link to="/">Application Name</Link>
        </li>
        <li>
          { renderNavigation(hasUser) }
        </li>
      </nav>

);

AppNavigation.propTypes = {
  hasUser: PropTypes.object,
};

export default AppNavigation;