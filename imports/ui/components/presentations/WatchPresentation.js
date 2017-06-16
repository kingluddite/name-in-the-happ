import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { randomArrItem } from './../../../helpers/myHelpers';

// collections
import PresentationsCollection from './../../../api/presentations';
import StudentsCollection from './../../../api/students';

// components
import BackButton from './../BackButton';
import EndPresentation from './EndPresentation';
import StartPresentation from './StartPresentation';
import PlayPresentation from './PlayPresentation';

export class WatchPresentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presentationStarted: false,
      currentPresenter: {},
      onDeck: {},
      students: [],
      firstPresenter: false,
      presentationComplete: false,
    };

    this.startPresentation = this.startPresentation.bind(this);
    this.nextStudent = this.nextStudent.bind(this);
    this.skipStudent = this.skipStudent.bind(this);
  }

  renderStudents() {
    return this.props.students.map((student) => {
      return <li key={student._id}>{student.name}</li>;
    });
  }

  startPresentation() {
    this.setState({
      presentationStarted: true,
      students: this.props.students,
      firstPresenter: true,
    });
  }

  nextStudent() {
    if (this.state.students.length === 0) {
      this.setState({
        presentationComplete: true
      });
    }
    let randomStudent;
    const onDeckStudent = this.state.onDeck;
    if (!this.state.firstPresenter) {
      randomStudent = onDeckStudent;
    } else {
      randomStudent = randomArrItem(this.state.students);
      this.setState({
        firstPresenter: false,
      });
    }
    const remainingPresenters = this.state.students.filter((el) => {
      return el._id !== randomStudent._id;
    });
    this.setState({
      students: remainingPresenters,
      currentPresenter: randomStudent,
    });
    this.onDeck();
  }

  onDeck() {
    if (!this.state.onDeck) return;
    const onDeckStudent = randomArrItem(this.state.students);
    const remainingPresenters = this.state.students.filter((el) => {
      return el._id !== onDeckStudent._id;
    });
    this.setState({
      students: remainingPresenters,
      onDeck: onDeckStudent,
    });
  }

  skipStudent() {
    this.nextStudent();
  }

  render() {
    let page;
    if (this.state.presentationStarted) {
        console.log('play');
        page = <PlayPresentation
                 remainingPresenters={this.state.students.length}
                 onDeckName={this.state.onDeck ? this.state.onDeck.name : undefined}
                 currentPresenterName={this.state.currentPresenter ? this.state.currentPresenter.name : undefined}
                 skipStudent={this.skipStudent}
                 nextStudent={this.nextStudent}
               />;
    } else if (this.state.presentationComplete) {
        console.log('end');
        page = <EndPresentation />;
    } else if (!this.state.presentationStarted) {
        console.log('start');
        page = <StartPresentation startPresentation={this.startPresentation} />;
    } else {
        page = '';
    }

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
            {page}
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

export default createContainer(({ params }) => {
  const sectionId = params.sectionId;
  const presentationId = params.presentationId;

  Meteor.subscribe('studentsPublication', sectionId, presentationId);

  return {
    presentation: PresentationsCollection.findOne(presentationId),
    students: StudentsCollection.find().fetch(),
    call: Meteor.call,
  };
}, WatchPresentation);
