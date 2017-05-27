import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const StudentsListItem = (props) => {
  const className = props.student.selected ? 'item item--selected' : 'item';
  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedStudentId', props.student._id);
    }}>
      <h5 className="item__title">{ props.student.name || 'Unnamed Student' }</h5>
      <p className="item__subtitle">{ moment(props.student.updatedAt).format('M/DD/YYYY') }</p>
    </div>
  );
};

StudentsListItem.propTypes = {
  student: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired,
};

export default createContainer(() => {
  return { Session };
}, StudentsListItem);
