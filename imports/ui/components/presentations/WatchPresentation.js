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
      console.log('It is over!');
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
    // const allStudents = this.props.students;
    // const randomStudent = randomArrItem(allStudents);
    // const alreadyPresented = [];
    // alreadyPresented.push(randomStudent._id);

    this.setState({
      presentationStarted: true,
      students: this.props.students,
      firstPresenter: true,
    });
    // this.nextStudent();
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
               <div>Students left to present: {this.state.students.length}</div>
              <div>Current Presenter: {this.state.currentPresenter ? this.state.currentPresenter.name : undefined} </div>
              <div>Next Presenter: {this.state.onDeck ? this.state.onDeck.name : undefined} </div>
              <div>
                {!this.state.presentationStarted ? (
                  <button
                    className="button" onClick={this.beginPresentation.bind(this)}>
                    Begin
                  </button>
                ) : undefined}
                <button className="button" onClick={this.nextStudent.bind(this)}>Next</button>
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
