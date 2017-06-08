import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { randomArrItem } from './../../../helpers/myHelpers';

// collections
import PresentationsCollection from './../../../api/presentations';
import StudentsCollection from './../../../api/students';

// components
import BackButton from './../BackButton';

export class WatchPresentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presentationStarted: false,
      currentSpeaker: {},
    };
  }

  renderStudents() {
    return this.props.students.map((student) => {
      return <li key={student._id}>{student.name}</li>;
    });
  }

  beginPresentation() {
    const randomStudent = randomArrItem(this.props.students);
    randomStudent.currentSpeaker = true;
    this.setState({
      presentationStarted: true,
      currentSpeaker: randomStudent,
    });
  }

  render() {
    return (
      <div>
          <div className="page-content">
          <aside className="page-content__sidebar">
            <div className="item-list">
              <BackButton />
              <h3>Students In Class</h3>
              <ul>
                {this.renderStudents()}
              </ul>
            </div>
          </aside>
          <main className="page-content__main">
            <div className="editor">
              {this.state.currentSpeaker.name}
              <div>
                {!this.state.presenationStarted ? (
                  <button
                    className="button" onClick={this.beginPresentation.bind(this)}>
                    Begin
                  </button>
                ) : undefined}
                <button className="button">Skip</button>
                <button className="button">Absent</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

WatchPresentation.propTypes = {
  presentation: PropTypes.object,
  students: PropTypes.array,
  call: PropTypes.func.isRequired,
};

export default createContainer(() => {
  const sectionId = Session.get('sectionId');
  const presentationId = Session.get('presentationId');

  Meteor.subscribe('studentsPublication', sectionId, presentationId);

  return {
    presentation: PresentationsCollection.findOne(presentationId),
    students: StudentsCollection.find().fetch(),
    call: Meteor.call,
  };
}, WatchPresentation);
