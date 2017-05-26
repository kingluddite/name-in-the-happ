import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
import onAuthChange from './../imports/startup/client/routes';

// simple Simpl-Schema
import './../imports/startup/simple-schema-configuration';

// collections
import './../imports/api/sections';
import './../imports/api/presentations';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedPresentationId = Session.get('selectedPresentationId');
  Session.set('isNavOpen', false);

  if (selectedPresentationId) {
    browserHistory.replace(`/presentations/${selectedPresentationId}`);
  }
});

Tracker.autorun(() => {
  const selectedSectionId = Session.get('selectedSectionId');
  Session.set('isNavOpen', false);

  if (selectedSectionId) {
    browserHistory.replace(`/sections/${selectedSectionId}`);
  }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open', isNavOpen);
});
