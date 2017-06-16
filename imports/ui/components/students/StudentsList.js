import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

// collections
import SectionsCollection from '../../../api/sections';
import StudentsCollection from '../../../api/students';
import PresentationsCollection from '../../../api/presentations';

// components
import NewStudent from './NewStudent';
import StudentsListItem from './StudentsListItem';
import StudentsListEmptyItem from './StudentsListEmptyItem';
import BackButton from './../BackButton';
import StudentsListHeading from './StudentsListHeading';


export const StudentsList = (props) => {
  const renderStudents = props.students.map((student) => {
    return <StudentsListItem key={student._id} student={student} />;
  });
  return (
    <div className="item-list">
        <div className="item-list__header">
            <BackButton />
        </div>
      <NewStudent params={props.params} />
      <StudentsListHeading
        sectionName={props.sectionExists ? props.section.name : undefined}
        presentationTitle={props.presentationExists ? props.presentation.title : undefined}
      />
      {(props.students.length === 0) ? <StudentsListEmptyItem /> : undefined}
      {renderStudents}
    </div>
  );
};

StudentsList.propTypes = {
  students: PropTypes.array.isRequired,
  section: PropTypes.object.isRequired,
  sectionExists: PropTypes.bool.isRequired,
  presentation: PropTypes.object.isRequired,
  presentationExists: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
};

// https://guide.meteor.com/react.html#using-createContainer
// how to handle data not loaded
export default createContainer(({ params }) => {
  const selectedStudentId = Session.get('selectedStudentId');
  const sectionId = params.sectionId;
  const sectionHandle = Meteor.subscribe('sectionsPublication');
  const loadingSection = !sectionHandle.ready();
  const section = SectionsCollection.findOne(sectionId);
  const sectionExists = !loadingSection && !!section;

  const presentationId = params.presentationId;
  const presentationHandle = Meteor.subscribe('presentationsPublication', sectionId);
  const loadingPresentation = !presentationHandle.ready();
  const presentation = PresentationsCollection.findOne(presentationId);
  const presentationExists = !loadingPresentation && !!presentation;

  const studentsHandle = Meteor.subscribe('studentsPublication', sectionId, presentationId);
  const loadingStudents = !studentsHandle.ready();

  return {
    loadingSection,
    section,
    sectionExists,
    loadingPresentation,
    presentation,
    presentationExists,
    loadingStudents,
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
