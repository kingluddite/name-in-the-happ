/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Session } from 'meteor/session';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

// Components
import App from '../../ui/layouts/App';
import Login from '../../ui/pages/Login';
import NotFound from '../../ui/pages/NotFound';
import Signup from '../../ui/pages/Signup';
import Sections from '../../ui/pages/Sections';
import ViewSection from '../../ui/pages/ViewSection';

const publicPages = ['/', '/signup', '/'];
const privatePages = ['/sections'];

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

const onLeaveSectionPage = () => {
  Session.set('currentSectionId', null);
};

const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isPublicPage = publicPages.includes(pathname);
  const isPrivatePage = privatePages.includes(pathname);

  // if public page and logged in - let them in
  if (isPublicPage && isAuthenticated) {
    browserHistory.replace('/sections');
  } else if (isPrivatePage && !isAuthenticated) {
    // if private page and not logged in - kick them out
    browserHistory.replace('/');
  }
};


Meteor.startup(() => {
  Session.set('currentSectionId', null);
  render(
    <Router history={ browserHistory } >
      <Route path="/" component={ App }>
        <IndexRoute name="login" component={ Login } onEnter={ onEnterPublicPage } />
        <Route name="signup" path="/signup" component={ Signup } onEnter={ onEnterPublicPage }/>
        <Route name="sections" path="/sections" component={ Sections } onEnter={ onEnterPrivatePage } />
        {/* <Route name="newSection" path="/sections/new" component={ NewSection } onEnter={ authenticate } />
        <Route name="editSection" path="/sections/:_id/edit" component={ EditSection } onEnter={ authenticate } />*/}
        <Route name="viewSection" path="/sections/:_id" component={ ViewSection } onEnter={ onEnterPrivatePage } onLeave={onLeaveSectionPage} />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root'),
  );
});

export default onAuthChange;
