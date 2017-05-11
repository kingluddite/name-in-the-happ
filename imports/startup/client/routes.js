/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import App from '../../ui/layouts/App';
import Index from '../../ui/pages/Index';
import Login from '../../ui/pages/Login';
import NotFound from '../../ui/pages/NotFound';
import Signup from '../../ui/pages/Signup';
import Sections from '../../ui/pages/sections/Sections';

const unauthenticatedPages = ['/', '/signup', '/login'];
const authenticatedPages = ['/sections'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/sections');
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  // if public page and logged in - let them in
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/sections');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    // if private page and not logged in - kick them onSubmit
    browserHistory.replace('/');
  }
});


Meteor.startup(() => {
  render(
    <Router history={ browserHistory } >
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } onEnter={ onEnterPublicPage } />
        <Route name="login" path="/login" component={ Login } onEnter={ onEnterPublicPage } />
        <Route name="signup" path="/signup" component={ Signup } onEnter={ onEnterPublicPage }/>
        <Route name="sections" path="/sections" component={ Sections } onEnter={ onEnterPrivatePage } />
        {/* <Route name="newSection" path="/sections/new" component={ NewSection } onEnter={ authenticate } />
        <Route name="editSection" path="/sections/:_id/edit" component={ EditSection } onEnter={ authenticate } />
        <Route name="viewSection" path="/sections/:_id" component={ ViewSection } onEnter={ authenticate } /> */}
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root'),
  );
});
