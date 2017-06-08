import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

// collections
import StudentsCollection from '../../../api/students';

// components
import NewStudent from './NewStudent';
import StudentsListItem from './StudentsListItem';
import StudentsListEmptyItem from './StudentsListEmptyItem';
import BackButton from './../BackButton';

export const StudentsList = (props) => {

  const renderStudents = props.students.map((student) => {
    return <StudentsListItem key={student._id} student={student} />;
  });

  return (
    <div className="item-list">
      <BackButton />
      <NewStudent />
      {(props.students.length === 0) ? <StudentsListEmptyItem /> : undefined}
      {renderStudents}
    </div>
  );
};

StudentsList.propTypes = {
  students: PropTypes.array.isRequired,
};

export default createContainer(({ params }) => {
  const selectedStudentId = Session.get('selectedStudentId');
  const sectionId = params.sectionId;
  const presentationId = params.presentationId;

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
