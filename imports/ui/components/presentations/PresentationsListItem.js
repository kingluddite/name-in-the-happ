import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const PresentationsListItem = (props) => {
  return (
    <div onClick={() => {
      props.Session.set('selectedPresentationId', props.presentation._id);
    }}>
      <h5>{ props.presentation.title || 'Untitled Presentation' }</h5>
      <p>{ moment(props.presentation.updatedAt).format('M/DD/YYYY') }</p>
    </div>
  );
};

PresentationsListItem.propTypes = {
  presentation: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired,
};

export default createContainer(() => {
  return { Session };
}, PresentationsListItem);
