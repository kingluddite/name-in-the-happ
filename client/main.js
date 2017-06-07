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
import './../imports/api/students';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  onAuthChange(isAuthenticated, currentPagePrivacy);
});

// sections - on SectionsListItem when item clicked Session changed
Tracker.autorun(() => {
  const selectedSectionId = Session.get('selectedSectionId');
  Session.set('isNavOpen', false);

  if (selectedSectionId) {
    browserHistory.replace(`/sections/${selectedSectionId}`);
  }
});

// presentations - on PresentationsListItem when item clicked Session changed
Tracker.autorun(() => {
  const selectedPresentationId = Session.get('selectedPresentationId');
  const sectionId = Session.get('sectionId');

  Session.set('isNavOpen', false);

  if (selectedPresentationId && sectionId) {
    const path = `/sections/${sectionId}/presentations/${selectedPresentationId}`;
    browserHistory.replace(path);
  }
});

// students - on StudentsListItem when item clicked Session changed
Tracker.autorun(() => {
  const selectedStudentId = Session.get('selectedStudentId');
  const sectionId = Session.get('sectionId');
  const presentationId = Session.get('presentationId');

  Session.set('isNavOpen', false);

  if (selectedStudentId && sectionId && presentationId) {
    const path = `/sections/${sectionId}/presentations/${presentationId}/students/${selectedStudentId}`;
    browserHistory.replace(path);
  }
});

// isNavOpen checks to see if we are on mobile layout and if user clicks
// tribar to open sidebar
Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open', isNavOpen);
});
