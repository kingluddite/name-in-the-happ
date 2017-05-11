import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { onAuthChange } from './../imports/startup/client/routes';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});
