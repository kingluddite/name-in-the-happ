import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

// collections
import { Sections } from './../imports/api/collections/sections';

// components
import App from './../imports/ui/components/App';

Meteor.startup(() => {

  Tracker.autorun(() => {
    const sections = Sections.find().fetch();
    const title = 'Name in the Happ';
    const slogan = 'Presentation App';

    ReactDOM.render(<App sections={sections} title={title} slogan={slogan} />, document.getElementById('app'));
  });

});