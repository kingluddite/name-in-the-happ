import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

export const PresentationsListHeader = (props) => {
  const handleButtonClick = () => {
    props.meteorCall('presentations.insert', (err, res) => {
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

PresentationsListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired,
};

export default createContainer(() => {
  return ({
    meteorCall: Meteor.call,
    Session,
  });
}, PresentationsListHeader);
