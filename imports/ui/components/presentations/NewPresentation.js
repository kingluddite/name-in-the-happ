import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export const NewPresentation = (props) => {
  const sectionId = props.sectionId;
  const handleButtonClick = () => {
    props.meteorCall('presentations.insert', sectionId, (err, res) => {
      if (res) {
        props.Session.set('selectedPresentationId', res);
      }
    });
  };

  return (
    <div className="item-list__header">
      <button className="button" onClick={handleButtonClick}>Create Presentation</button>
    </div>
  );
};

NewPresentation.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired,
  sectionId: PropTypes.string.isRequired,
};

export default createContainer(() => {
  return ({
    meteorCall: Meteor.call,
    Session,
  });
}, NewPresentation);
