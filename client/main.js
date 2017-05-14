import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import onAuthChange from './../imports/startup/client/routes';

// simple Simpl-Schema
import './../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});
