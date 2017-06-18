import React from 'react';
import { Link } from 'react-router';

export const StudentsListHeading = (props) => {

  return (
    <div className="students-list-header">
      <h3>{props.sectionName}</h3>
      <p>{props.presentationTitle}</p>
    </div>
  );
};

export default StudentsListHeading;
