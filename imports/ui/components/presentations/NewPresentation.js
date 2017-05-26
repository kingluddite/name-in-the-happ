import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export const NewPresentation = (props) => {
  const sectionId = Session.get('sectionId');
  const handleButtonClick = () => {
    props.meteorCall('presentations.insert', sectionId, (err, res) => {
      if (res) {
        props.Session.set('selectedPresentationId', res);
      }
    });
  };

  return (
    <div className="item-list__header">
      <Link to="/sections" className="button">Back</Link>
      <button className="button" onClick={handleButtonClick}>Create Presentation</button>
    </div>
  );
};

NewPresentation.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired,
};

export default createContainer(() => {
  return ({
    meteorCall: Meteor.call,
    Session,
  });
}, NewPresentation);
