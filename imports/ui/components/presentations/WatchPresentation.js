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
      presentationPlaying: false,
      currentPresenter: {},
      onDeckPresenter: {},
      students: this.props.students,
      remainingPresenters: [],
      firstPresenter: false,
      presentationComplete: false,
    };

    this.startPresentation = this.startPresentation.bind(this);
    this.pickRandomPresenter = this.pickRandomPresenter.bind(this);
    this.nextPresenter = this.nextPresenter.bind(this);
    this.skipPresenter = this.skipPresenter.bind(this);
    this.resetPresentation = this.resetPresentation.bind(this);
  }

  // data is loaded asynchronously
  // and it might not be available in the constructor
  // However, the callback function you pass to createContainer is
  // evaluated again when the data is loaded
  // and it automatically updates the props of your component
  // To catch this change, implement the componentWillReceiveProps
  // function in your React component
  // https://stackoverflow.com/questions/36702239/meteor-reactjs-in-constructor-collection-is-empty
  componentWillReceiveProps(nextProps) {
    this.setState({
      students: nextProps.students,
      remainingPresenters: nextProps.students,
    });
  }

  renderStudents() {
    return this.props.students.map((student) => {
      return <li key={student._id}>{student.name}</li>;
    });
  }

  startPresentation() {
    const randomPresenter = this.pickRandomPresenter();
    const onDeckPresenter = this.pickRandomPresenter();
    const remainingPresenters = this.removeFromPresenterList(randomPresenter);
    // remainingPresenters = this.removeFromPresenterList(onDeckPresenter);
    this.setState({
      presentationPlaying: true,
      firstPresenter: true,
      currentPresenter: randomPresenter,
      onDeckPresenter,
      remainingPresenters,
    });
  }

  resetPresentation() {
    this.setState({
      presentationPlaying: false,
      currentPresenter: {},
      onDeckPresenter: {},
      students: this.props.students,
      remainingPresenters: this.props.students,
      firstPresenter: false,
      presentationComplete: false,
    });
  }

  nextPresenter() {
    // check if the presentation is completed
    this.isPresentationComplete();
    // our current presenter is the presenter on deck
    const currentPresenter = this.state.onDeckPresenter;
    // our on deck present is picked randomly
    const onDeckPresenter = this.pickRandomPresenter();
    const remainingPresenters = this.removeFromPresenterList(onDeckPresenter);
    this.setState({
      currentPresenter,
      remainingPresenters,
      onDeckPresenter,
    });
  }

  isPresentationComplete() {
    if (this.state.remainingPresenters.length === 0 && this.state.onDeckPresenter === undefined) {
      this.setState({
        presentationComplete: true,
        presentationPlaying: false,
      });
    }
  }

  removeFromPresenterList(presenter) {
    // remove presenter from the presenter list
    const remainingPresenters = this.state.remainingPresenters.filter((el) => {
      return el._id !== presenter._id;
    });
    return remainingPresenters;
  }

  pickRandomPresenter() {
    // pick a random student
    let randomStudent;
    if (!this.state.firstPresenter) {
      randomStudent = randomArrItem(this.props.students);
    } else {
      randomStudent = randomArrItem(this.state.remainingPresenters);
    }
    return randomStudent;
  }

  skipPresenter() {
    // make sure there is someone on deck and the presenters remaining are not 0
    if (this.state.remainingPresenters.length === 0 && this.state.onDeckPresenter === undefined) {
      // grab the current presenter
      const oldCurrentPresenter = this.state.currentPresenter;
      // grab all the remaining presenters
      const remainingPresenters = this.state.remainingPresenters;
      // add the current presenter to the remaining presenters
      remainingPresenters.push(oldCurrentPresenter);
      // make on deck person current presenter
      const newCurrentPresenter = this.state.onDeckPresenter;
      // grab new random on deck presenter
      const newOnDeckPresenter = this.pickRandomPresenter();
      const newRemainingPresenters = this.removeFromPresenterList(newCurrentPresenter);
      this.setState({
        currentPresenter: newCurrentPresenter,
        remainingPresenters: newRemainingPresenters,
        onDeckPresenter: newOnDeckPresenter,
      });
    }
  }

  render() {
    let page;
    if (this.state.presentationPlaying) {
      page = <PlayPresentation
           remainingPresenters={this.state.remainingPresenters.length}
           onDeckName={this.state.onDeckPresenter ? this.state.onDeckPresenter.name : undefined}
           currentPresenterName={
            this.state.currentPresenter ?
              this.state.currentPresenter.name
              : undefined}
           skipPresenter={this.skipPresenter}
           nextPresenter={this.nextPresenter}
               />;
    } else if (this.state.presentationComplete) {
      page = <EndPresentation reset={this.resetPresentation} />;
    } else if (!this.state.presentationStarted) {
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
  studentsExist: PropTypes.bool,
};

export default createContainer(({ params }) => {
  const sectionId = params.sectionId;
  const presentationId = params.presentationId;
  const studentsHandle = Meteor.subscribe('studentsPublication', sectionId, presentationId);

  const loadingStudents = !studentsHandle.ready();
  const students = StudentsCollection.find().fetch();
  const studentsExist = !loadingStudents && !!students;

  return {
    studentsHandle,
    loadingStudents,
    students,
    studentsExist,
    presentation: PresentationsCollection.findOne(presentationId),
    call: Meteor.call,
  };
}, WatchPresentation);
