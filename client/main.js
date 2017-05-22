import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
import onAuthChange from './../imports/startup/client/routes';

// simple Simpl-Schema
import './../imports/startup/simple-schema-configuration';

// collections
import './../imports/api/presentations';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  const selectedPresentationId = Session.get('selectedPresentationId');

  if (selectedPresentationId) {
    browserHistory.replace(`/presentations/${selectedPresentationId}`);
  }
  // console.log('currentPagePrivacy', currentPagePrivacy);
  onAuthChange(isAuthenticated, currentPagePrivacy);
});
