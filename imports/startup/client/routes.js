/* eslint-disable max-len */
import React from 'react';
import { render } from 'react-dom';
import { Session } from 'meteor/session';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import { getPageTitle } from './../../helpers/myHelpers';

// Components
import App from '../../ui/layouts/App';
import About from '../../ui/pages/About';
import Login from '../../ui/pages/Login';
import NotFound from '../../ui/pages/NotFound';
import Signup from '../../ui/pages/Signup';
import Sections from '../../ui/pages/Sections';
import Presentations from '../../ui/pages/Presentations';
import WatchPresentation from '../../ui/components/presentations/WatchPresentation';
import Students from '../../ui/pages/Students';

const onEnterPresentationsViewPage = (nextState) => {
  Session.set('selectedPresentationId', nextState.params.presentationId);
};

const onLeavePresentationsViewPage = () => {
  Session.set('selectedPresentationId', undefined);
};

const onEnterSectionsViewPage = (nextState) => {
  Session.set('selectedSectionId', nextState.params.sectionId);
};

const onLeaveSectionsViewPage = () => {
  Session.set('selectedSectionId', undefined);
};

const onEnterStudentsViewPage = (nextState) => {
  Session.set('selectedStudentId', nextState.params.studentId);
};

const onLeaveStudentsViewPage = () => {
  Session.set('selectedStudentId', undefined);
};

const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isPublicPage = currentPagePrivacy === 'unauth';
  const isPrivatePage = currentPagePrivacy === 'auth';

  // if public page and logged in - let them in
  if (isPublicPage && isAuthenticated) {
    browserHistory.replace('/sections');
  } else if (isPrivatePage && !isAuthenticated) {
    // if private page and not logged in - kick them out
    browserHistory.replace('/');
  }
};

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);

  getPageTitle(nextState);
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};

Meteor.startup(() => {
  Session.set('selectedPresentationId', undefined);
  Session.set('selectedSectionId', undefined);
  Session.set('selectedStudentId', undefined);
  Session.set('isNavOpen', false);

  render(
    <Router history={browserHistory} >
      <Route onEnter={globalOnEnter} onChange={globalOnChange}>
        <Route path="/" component={App}>
          <IndexRoute name="login" component={Login} privacy="unauth" />
          <Route name="signup" path="/signup" component={Signup} privacy="unauth" />
          <Route name="about" path="/about" component={About} privacy="unauth" />
          <Route name="sections" path="/sections" component={Sections} privacy="auth"/>
          <Route name="viewSection" path="/sections/:sectionId" component={Sections} privacy="auth" onEnter={onEnterSectionsViewPage} onLeave={onLeaveSectionsViewPage} />
          <Route name="presentations" path="/sections/:sectionId/presentations" component={Presentations} privacy="auth" />
          <Route name="viewPresentation" path="/sections/:sectionId/presentations/:presentationId" component={Presentations} privacy="auth" onEnter={onEnterPresentationsViewPage} onLeave={onLeavePresentationsViewPage} />
          <Route name="students" path="/sections/:sectionId/presentations/:presentationId/students" component={Students} privacy="auth" />
          <Route name="viewStudents" path="/sections/:sectionId/presentations/:presentationId/students/:studentId" component={Students} privacy="auth" onEnter={onEnterStudentsViewPage} onLeave={onLeaveStudentsViewPage} />
          <Route name="watchPresentation" path="/sections/:sectionId/presentations/:presentationId/watch" component={WatchPresentation} privacy="auth" />
          <Route path="*" component={NotFound} />
        </Route>
    </Route>
  </Router>,
  document.getElementById('react-root'),
  );
});

export default onAuthChange;
