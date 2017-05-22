/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Session } from 'meteor/session';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

// Components
import App from '../../ui/layouts/App';
import About from '../../ui/pages/About';
import Login from '../../ui/pages/Login';
import NotFound from '../../ui/pages/NotFound';
import Signup from '../../ui/pages/Signup';
import Sections from '../../ui/pages/Sections';
import Presentations from '../../ui/pages/Presentations';
import ViewSection from '../../ui/components/sections/ViewSection';
import EditSection from '../../ui/components/sections/EditSection';

const onEnterSectionPage = (nextState) => {
  Session.set('selectedSectionId', nextState.params.id);
};

const onLeaveSectionPage = () => {
  Session.set('selectedSectionId', undefined);
};

const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isPublicPage = currentPagePrivacy === 'unauth';
  const isPrivatePage = currentPagePrivacy === 'auth';

  // if public page and logged in - let them in
  if (isPublicPage && isAuthenticated) {
    browserHistory.replace('/presentations');
  } else if (isPrivatePage && !isAuthenticated) {
    // if private page and not logged in - kick them out
    browserHistory.replace('/');
  }
};

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};

Meteor.startup(() => {
  Session.set('selectedPresentationId', undefined);
  Session.set('currentSectionId', null);
  render(
    <Router history={ browserHistory } >
      <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={ App }>
        <IndexRoute name="login" component={ Login } privacy="unauth" />
        <Route name="signup" path="/signup" component={ Signup } privacy="unauth" />
        <Route name="about" path="/about" component={ About } privacy="unauth" />
        <Route name="sections" path="/sections" privacy="auth" component={ Sections } />
        <Route name="presentations" path="/presentations" privacy="auth" component={ Presentations } />
        <Route name="presentationsView" path="/presentations/:id" privacy="auth" component={ Presentations } />
        {/* <Route name="newSection" path="/sections/new" component={ NewSection } onEnter={ authenticate } />*/}
        <Route name="editSection" path="/sections/:_id/edit" privacy="auth" component={ EditSection } />
        <Route name="viewSection" path="/sections/:_id" privacy="auth" component={ ViewSection } onEnter={ onEnterSectionPage } onLeave={onLeaveSectionPage} />
        <Route path="*" component={ NotFound } />
      </Route>
    </Route>
  </Router>,
  document.getElementById('react-root'),
  );
});

export default onAuthChange;
