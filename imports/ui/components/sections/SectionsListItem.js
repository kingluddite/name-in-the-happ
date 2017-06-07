import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const SectionsListItem = (props) => {
  const className = props.section.selected ? 'item item--selected' : 'item';
  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedSectionId', props.section._id);
    }}>
      <h5 className="item__title">{ props.section.name || 'Untitled Section' }</h5>
      <p className="item__subtitle">{ moment(props.section.updatedAt).format('M/DD/YYYY') }</p>
    </div>
  );
};

SectionsListItem.propTypes = {
  section: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired,
};

export default createContainer(() => {
  return { Session };
}, SectionsListItem);
