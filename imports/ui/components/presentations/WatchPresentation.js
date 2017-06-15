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
import Card from './../Card';

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
  }

  renderStudents() {
    return this.props.students.map((student) => {
      return <li key={student._id}>{student.name}</li>;
    });
  }

  nextStudent() {
    if (this.state.students.length === 0 && !this.state.currentPresenter && !this.state.onDeck) {
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

  beginPresentation() {
    this.setState({
      presentationStarted: true,
      students: this.props.students,
      firstPresenter: true,
    });
  }

  skipStudent() {
    this.nextStudent();
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
            {this.state.presentationComplete ? <h1>PRESENTATION OVER</h1> : undefined}
            Number Left To Present {this.state.students.length}
            Next Presenter: {this.state.onDeck.name}
              <div>
                  <span>Presenter</span>
                  <h2 className="watch__heading">Name: {this.state.currentPresenter.name}</h2>
              </div>
              <div>
                {!this.state.presentationStarted ? (
                  <button
                    className="button" onClick={this.beginPresentation.bind(this)}>
                    Begin
                  </button>
                ) : undefined}
                <button className="button" onClick={this.nextStudent.bind(this)}>Next</button>
                <button className="button" onClick={this.skipStudent.bind(this)}>Skip</button>
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
