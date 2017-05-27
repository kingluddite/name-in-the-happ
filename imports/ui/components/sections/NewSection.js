import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

export const NewSection = (props) => {
  const handleButtonClick = () => {
    props.meteorCall('sections.insert', (err, res) => {
      if (res) {
        props.Session.set('selectedSectionId', res);
        console.log('sid from add', res);
      }
    });
  };

  return (
    <div className="item-list__header">
      <button className="button" onClick={handleButtonClick}>Create Section</button>
    </div>
  );
};

NewSection.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired,
};

export default createContainer(() => {
  return ({
    meteorCall: Meteor.call,
    Session,
  });
}, NewSection);
