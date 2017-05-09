import React from 'react';
import { browserHistory, Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const AuthenticatedNavigation = () => (
  <div>
    <nav>
      <ul>
        <li>Sections</li>
        <li onClick={ handleLogout }>Logout</li>
      </ul>
    </nav>
  </div>
);

export default AuthenticatedNavigation;