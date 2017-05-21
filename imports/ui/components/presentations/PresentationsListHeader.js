import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

export const PresentationsListHeader = (props) => {
  const handleButtonClick = () => {
    props.meteorCall('presentations.insert');
  };

  return (
    <div>
      <button className="button" onClick={handleButtonClick}>Create Presentation</button>
    </div>
  );
};

PresentationsListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
};

export default createContainer(() => {
  return ({
    meteorCall: Meteor.call,
  });
}, PresentationsListHeader);
