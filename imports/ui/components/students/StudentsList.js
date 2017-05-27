import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

// collections
import StudentsCollection from '../../../api/sections';

// components
import NewStudent from './NewStudent';
import StudentsListItem from './StudentsListItem';
import StudentsListEmptyItem from './StudentsListEmptyItem';

export const StudentsList = (props) => {
  const renderStudents = props.students.map((student) => {
    return <StudentsListItem key={student._id} student={student} />;
  });

  return (
    <div className="item-list">
      <NewStudent />
      {(props.students.length === 0) ? <StudentsListEmptyItem /> : undefined}
      {renderStudents}
    </div>
  );
};

StudentsList.propTypes = {
  students: PropTypes.array.isRequired,
};

export default createContainer(() => {
  const selectedStudentId = Session.get('selectedStudentId');
  const sectionId = Session.get('sectionId');
  const presentationId = Session.get('presentationId');

  Meteor.subscribe('studentsPublication', sectionId, presentationId);

  return {
    students: StudentsCollection.find({}, {
      sort: { updatedAt: -1 },
    }).fetch().map((student) => {
      return {
        ...student,
        selected: student._id === selectedStudentId,
      };
    }),
  };
}, StudentsList);
