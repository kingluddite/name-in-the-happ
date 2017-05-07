import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  const name = 'PEH2';
  const jsx = <p>hello {name}</p>;
  ReactDOM.render(jsx, document.getElementById('app'));
});